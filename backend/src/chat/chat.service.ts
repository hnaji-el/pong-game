import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';
import { UserEntity } from 'src/users/entities/user.entity';
import { ChannelType, User } from '@prisma/client';
import { AttachedUserEntity } from 'src/users/entities/attachedUser.entity';
import { Channel, Dm, Message, Rooms } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async getUserFromJwtToken(jwtToken?: string): Promise<User | null> {
    if (!jwtToken) return null;

    let user: User;

    try {
      const payload = this.jwt.verify(jwtToken, {
        secret: process.env.SECRET,
      });

      user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: payload.sub,
        },
      });
    } catch {
      return null;
    }

    return user;
  }

  async createDM(user1Id: string, user2Id: string): Promise<void> {
    await this.prisma.dM.create({
      data: {
        user1Id: user1Id < user2Id ? user1Id : user2Id,
        user2Id: user1Id > user2Id ? user1Id : user2Id,
      },
    });
  }

  async createChannel(
    userId: string,
    name: string,
    type: ChannelType,
    password?: string,
  ): Promise<{ id: string }> {
    // Validate input for protected channels
    if (type === 'PROTECTED' && !password) {
      throw new Error('Password is required for protected channels.');
    }

    // Create the channel
    const channel = await this.prisma.channel.create({
      data: {
        name,
        type,
        hashedPassword: password
          ? bcrypt.hashSync(password, bcrypt.genSaltSync())
          : null,
      },
    });

    // Add the creator to the channelMembership table as OWNER
    await this.prisma.channelMembership.create({
      data: {
        userId,
        channelId: channel.id,
        role: 'OWNER',
      },
    });

    return { id: channel.id };
  }

  async getUserDms(userId: string): Promise<Dm[]> {
    const dms = await this.prisma.dM.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      orderBy: { updatedAt: 'desc' },
      include: {
        user1: true,
        user2: true,
      },
    });

    return dms.map((dm) => {
      const user = dm.user1.id === userId ? dm.user2 : dm.user1;

      return {
        id: dm.id,
        createdAt: dm.createdAt,
        updatedAt: dm.updatedAt,
        userId: user.id,
        nickname: user.nickname,
        pictureURL: user.pictureUrl,
        isOnline: user.isOnline,
      };
    });
  }

  async getUserJoinedChannels(userId: string): Promise<Channel[]> {
    const memberships = await this.prisma.channelMembership.findMany({
      where: { userId },
      include: { channel: true },
    });

    // Sort memberships by channel.updatedAt descending
    const joinedChannels = memberships
      .sort(
        (a, b) => b.channel.updatedAt.getTime() - a.channel.updatedAt.getTime(),
      )
      .map((m) => ({
        id: m.channelId,
        createdAt: m.channel.createdAt,
        updatedAt: m.channel.updatedAt,
        name: m.channel.name,
        type: m.channel.type,
        role: m.role,
        isJoined: true,
      }));

    return joinedChannels;
  }

  async getUserNotJoinedChannels(
    joinedChannelsIds: Set<string>,
  ): Promise<Channel[]> {
    const channels = await this.prisma.channel.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const notJoinedChannels = channels
      .filter(
        (channel) =>
          !joinedChannelsIds.has(channel.id) && channel.type !== 'PRIVATE',
      )
      .sort((c1, c2) => c2.updatedAt.getTime() - c1.updatedAt.getTime())
      .map(
        (channel): Channel => ({
          ...channel,
          role: null,
          isJoined: false,
        }),
      );

    return notJoinedChannels;
  }

  async getUserRooms(userId: string, isDm: boolean): Promise<Rooms> {
    const rooms: Rooms = {
      dms: [],
      joinedChannels: [],
      notJoinedChannels: [],
    };

    if (isDm) {
      rooms.dms = await this.getUserDms(userId);
    } else {
      rooms.joinedChannels = await this.getUserJoinedChannels(userId);
      rooms.notJoinedChannels = await this.getUserNotJoinedChannels(
        new Set(rooms.joinedChannels.map((channel) => channel.id)),
      );
    }

    return rooms;
  }

  async getDmMessages(userId: string, roomId: string): Promise<Message[]> {
    const dm = await this.prisma.dM.findFirst({
      where: {
        id: roomId,
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      select: {
        messages: {
          include: {
            sender: {
              select: {
                pictureUrl: true,
              },
            },
          },
          orderBy: { sentAt: 'desc' },
        },
      },
    });

    if (!dm) {
      return [];
    }

    return dm.messages.map((msg): Message => {
      return {
        id: msg.id,
        chatId: msg.dmId,
        senderId: msg.senderId,
        senderPictureUrl: msg.sender.pictureUrl,
        content: msg.content,
        sentAt: msg.sentAt,
      };
    });
  }

  async getChannelMessages(userId: string, roomId: string): Promise<Message[]> {
    const channelMembership = await this.prisma.channelMembership.findFirst({
      where: { userId, channelId: roomId },
      select: {
        channel: {
          select: {
            messages: {
              include: {
                sender: {
                  select: { pictureUrl: true },
                },
              },
              orderBy: { sentAt: 'desc' },
            },
          },
        },
      },
    });

    if (!channelMembership) {
      return [];
    }

    return channelMembership.channel.messages.map((msg): Message => {
      return {
        id: msg.id,
        chatId: msg.channelId,
        senderId: msg.senderId,
        senderPictureUrl: msg.sender.pictureUrl,
        content: msg.content,
        sentAt: msg.sentAt,
      };
    });
  }

  // async createRoom(
  //   name: string,
  //   owner: string,
  //   members: string[],
  //   type: string,
  //   password?: string,
  // ) {
  //   if (type === 'PROTECTED' && !password) {
  //     throw new ForbiddenException('Password is required for protected rooms');
  //   }

  //   try {
  //     await this.prisma.room.create({
  //       data: {
  //         name: name,
  //         owner: owner,
  //         admins: [owner],
  //         members: [owner, ...members],
  //         type: type,
  //         ...(type === 'PROTECTED' && password
  //           ? {
  //               hashedPassword: bcrypt.hashSync(password, bcrypt.genSaltSync()),
  //             }
  //           : {}),
  //       },
  //     });
  //   } catch (error) {
  //     // handle unique constraint violation error
  //     if (
  //       error instanceof Prisma.PrismaClientKnownRequestError &&
  //       error.code === 'P2002'
  //     ) {
  //       throw new ForbiddenException(
  //         'A room with this name already exists. Please choose a different name',
  //       );
  //     }

  //     // handle database connection error or other unexpected error
  //     console.error(
  //       'Database connection error or other unexpected error:',
  //       error.stack,
  //     );

  //     throw new InternalServerErrorException(
  //       'An unexpected error occurred. Please try again later',
  //     );
  //   }
  // }

  // async getDmData(room: Room, user: User): Promise<DmType> {
  //   try {
  //     const roomMsgs = await this.prisma.room.findUnique({
  //       where: {
  //         name: room.name,
  //       },
  //       select: {
  //         messages: {
  //           orderBy: {
  //             createdAt: 'desc',
  //           },
  //         },
  //       },
  //     });

  //     return {
  //       id: user.id,
  //       nickname: user.nickname,
  //       pictureURL: user.pictureURL,
  //       status: user.status,
  //       type: room.type,
  //       latestMessage:
  //         roomMsgs.messages[roomMsgs.messages.length - 1]?.data ?? '',
  //       messages: roomMsgs.messages.map((msg) => ({
  //         id: msg.id,
  //         roomName: msg.roomName,
  //         userId: msg.userId,
  //         pictureURL: msg.pictureURL,
  //         data: msg.data,
  //       })),
  //     };
  //   } catch (error) {
  //     this.handleUnexpectedErrors(error);
  //   }
  // }

  // async getDmsData(user: AttachedUserEntity): Promise<DmType[]> {
  //   try {
  //     const rooms = await this.prisma.room.findMany({
  //       where: {
  //         type: 'DM',
  //         members: {
  //           has: user.nickname,
  //         },
  //       },
  //       orderBy: {
  //         updatedAt: 'desc',
  //       },
  //     });

  //     const dmsData = await Promise.all(
  //       rooms.map(async (room) => {
  //         const friend = await this.prisma.user.findUnique({
  //           where: {
  //             nickname:
  //               user.nickname === room.members[0]
  //                 ? room.members[1]
  //                 : room.members[0],
  //           },
  //         });

  //         return this.getDmData(room, friend);
  //       }),
  //     );

  //     return dmsData;
  //   } catch (error) {
  //     // Re-throw InternalServerErrorException if it has already been thrown, without logging it again.
  //     if (error instanceof InternalServerErrorException) {
  //       throw error;
  //     }
  //     this.handleUnexpectedErrors(error);
  //   }
  // }

  // async getChannelData(
  //   room: Room,
  //   user: User,
  //   isJoined: boolean,
  // ): Promise<ChannelType> {
  //   try {
  //     const roomMsgs = await this.prisma.room.findUnique({
  //       where: {
  //         name: room.name,
  //       },
  //       select: {
  //         messages: {
  //           orderBy: {
  //             createdAt: 'desc',
  //           },
  //         },
  //       },
  //     });

  //     return {
  //       id: room.id,
  //       name: room.name,
  //       members: room.members.length,
  //       role: this.getRole(room, user.nickname),
  //       type: room.type,
  //       latestMessage:
  //         roomMsgs.messages[roomMsgs.messages.length - 1]?.data ?? '',
  //       messages: roomMsgs.messages.map((msg) => ({
  //         id: msg.id,
  //         roomName: msg.roomName,
  //         userId: msg.userId,
  //         pictureURL: msg.pictureURL,
  //         data: msg.data,
  //       })),
  //       isJoined: isJoined,
  //     };
  //   } catch (error) {
  //     this.handleUnexpectedErrors(error);
  //   }
  // }

  // async getChannelsData(user: AttachedUserEntity): Promise<ChannelType[]> {
  //   try {
  //     const rooms = await this.prisma.room.findMany({
  //       where: {
  //         OR: [{ type: 'PROTECTED' }, { type: 'PUBLIC' }, { type: 'PRIVATE' }],
  //       },
  //       orderBy: {
  //         updatedAt: 'desc',
  //       },
  //     });

  //     const channelsData = (
  //       await Promise.all(
  //         rooms.map(async (room) => {
  //           const isMember = room.members.includes(user.nickname);
  //           const isBlocked = room.blocked.includes(user.nickname);

  //           if (isMember) {
  //             return this.getChannelData(room, user, true);
  //           }

  //           if (!isMember && !isBlocked && room.type !== 'PRIVATE') {
  //             return this.getChannelData(room, user, false);
  //           }
  //         }),
  //       )
  //     ).filter((data) => data !== undefined);

  //     return [
  //       ...channelsData.filter((channel) => channel.isJoined),
  //       ...channelsData.filter((channel) => !channel.isJoined),
  //     ];
  //   } catch (error) {
  //     // Re-throw InternalServerErrorException if it has already been thrown, without logging it again.
  //     if (error instanceof InternalServerErrorException) {
  //       throw error;
  //     }
  //     this.handleUnexpectedErrors(error);
  //   }
  // }

  //   async getChannelMembers(
  //     user: AttachedUserEntity,
  //     channelId: string,
  //   ): Promise<MemberType[]> {
  //     const room = await this.prisma.room.findUnique({
  //       where: { id: channelId },
  //     });

  //     const filteredMembers = [
  //       ...room.members.filter((nickname) => nickname !== user.nickname),
  //       ...room.blocked.filter((nickname) => nickname !== user.nickname),
  //     ];

  //     const members = await Promise.all(
  //       filteredMembers.map(async (member) => {
  //         const memberData = await this.prisma.user.findUnique({
  //           where: { nickname: member },
  //         });

  //         return {
  //           id: memberData.id,
  //           nickname: memberData.nickname,
  //           status: memberData.status,
  //           pictureURL: memberData.pictureURL,
  //           role: this.getRole(room, memberData.nickname),
  //         };
  //       }),
  //     );

  //     return members;
  //   }

  //   async getChannelNonMemberFriends(
  //     user: AttachedUserEntity,
  //     channelId: string,
  //   ): Promise<MemberType[]> {
  //     const nonMemberFriends = [];
  //     const room = await this.prisma.room.findUnique({
  //       where: { id: channelId },
  //     });

  //     for (const { type, addresseeId } of user.requester) {
  //       if (type !== 'FRIENDSHIP') continue;

  //       const friend = await this.prisma.user.findUnique({
  //         where: { id: addresseeId },
  //       });

  //       if (
  //         !room.members.includes(friend.nickname) &&
  //         !room.blocked.includes(friend.nickname)
  //       ) {
  //         nonMemberFriends.push({
  //           id: friend.id,
  //           nickname: friend.nickname,
  //           status: friend.status,
  //           pictureURL: friend.pictureURL,
  //           role: '',
  //         });
  //       }
  //     }

  //     for (const { type, requesterId } of user.addressee) {
  //       if (type !== 'FRIENDSHIP') continue;

  //       const friend = await this.prisma.user.findUnique({
  //         where: { id: requesterId },
  //       });

  //       if (
  //         !room.members.includes(friend.nickname) &&
  //         !room.blocked.includes(friend.nickname)
  //       ) {
  //         nonMemberFriends.push({
  //           id: friend.id,
  //           nickname: friend.nickname,
  //           status: friend.status,
  //           pictureURL: friend.pictureURL,
  //           role: '',
  //         });
  //       }
  //     }

  //     return nonMemberFriends;
  //   }

  //   async joinChannel(
  //     user: AttachedUserEntity,
  //     channelId: string,
  //   ): Promise<ChannelType> {
  //     const room = await this.prisma.room.findUnique({
  //       where: { id: channelId },
  //     });

  //     if (!room) return;

  //     if (room.blocked.includes(user.nickname))
  //       throw new ForbiddenException('user already blocked');

  //     if (room.members.includes(user.nickname))
  //       throw new ForbiddenException('user already member');

  //     const updatedRoom = await this.prisma.room.update({
  //       where: { id: room.id },
  //       data: {
  //         members: {
  //           push: user.nickname,
  //         },
  //       },
  //       include: {
  //         messages: {
  //           orderBy: {
  //             createdAt: 'desc',
  //           },
  //         },
  //       },
  //     });

  //     return {
  //       id: updatedRoom.id,
  //       name: updatedRoom.name,
  //       members: updatedRoom.members.length,
  //       latestMessage:
  //         updatedRoom.messages[updatedRoom.messages.length - 1]?.data ?? '',
  //       role: 'MEMBER',
  //       type: updatedRoom.type,
  //       messages: updatedRoom.messages.map((msg) => ({
  //         id: msg.id,
  //         roomName: msg.roomName,
  //         userId: msg.userId,
  //         pictureURL: msg.pictureURL,
  //         data: msg.data,
  //       })),
  //       isJoined: true,
  //     };
  //   }

  //   async joinProtectedChannel(
  //     user: AttachedUserEntity,
  //     data: { id: string; type: string; password?: string },
  //   ): Promise<ChannelType> {
  //     const room = await this.prisma.room.findUnique({
  //       where: { id: data.id },
  //     });

  //     if (!bcrypt.compareSync(data.password, room.hashedPassword)) {
  //       return {
  //         id: '',
  //         name: '',
  //         role: '',
  //         members: 0,
  //         type: '',
  //         latestMessage: '',
  //         messages: [],
  //         isJoined: false,
  //         isPasswordValid: false,
  //       };
  //     }

  //     if (room.blocked.includes(user.nickname))
  //       throw new ForbiddenException('user already blocked');
  //     if (room.members.includes(user.nickname))
  //       throw new ForbiddenException('user already member');

  //     const updatedRoom = await this.prisma.room.update({
  //       where: { id: room.id },
  //       data: {
  //         members: {
  //           push: user.nickname,
  //         },
  //       },
  //       include: {
  //         messages: {
  //           orderBy: {
  //             createdAt: 'desc',
  //           },
  //         },
  //       },
  //     });

  //     return {
  //       id: updatedRoom.id,
  //       name: updatedRoom.name,
  //       role: 'MEMBER',
  //       members: updatedRoom.members.length,
  //       type: updatedRoom.type,
  //       latestMessage:
  //         updatedRoom.messages[updatedRoom.messages.length - 1]?.data ?? '',
  //       messages: updatedRoom.messages.map((msg) => ({
  //         id: msg.id,
  //         roomName: msg.roomName,
  //         userId: msg.userId,
  //         pictureURL: msg.pictureURL,
  //         data: msg.data,
  //       })),
  //       isJoined: true,
  //       isPasswordValid: true,
  //     };
  //   }

  //   async addToChannelNotPublic(
  //     user: AttachedUserEntity,
  //     data: {
  //       channelId: string;
  //       channelType: string;
  //       userId: string;
  //     },
  //   ) {
  //     const friend = await this.prisma.user.findUnique({
  //       where: { id: data.userId },
  //     });

  //     const room = await this.prisma.room.findUnique({
  //       where: { id: data.channelId },
  //     });

  //     if (!room.admins.includes(user.nickname))
  //       throw new ForbiddenException('you are not an admin');

  //     if (room.blocked.includes(friend.nickname))
  //       throw new ForbiddenException('user blocked');

  //     if (room.members.includes(friend.nickname))
  //       throw new ForbiddenException('user already a member');

  //     await this.prisma.room.update({
  //       where: { id: room.id },
  //       data: {
  //         members: {
  //           push: friend.nickname,
  //         },
  //       },
  //     });
  //   }

  //   async addMember(data: {
  //     channelId: string;
  //     channelType: string;
  //     userId: string;
  //   }) {
  //     const friend = await this.prisma.user.findUnique({
  //       where: { id: data.userId },
  //     });

  //     const room = await this.prisma.room.findUnique({
  //       where: { id: data.channelId },
  //     });

  //     if (room.blocked.includes(friend.nickname))
  //       throw new ForbiddenException('user blocked');

  //     if (room.members.includes(friend.nickname))
  //       throw new ForbiddenException('user already members');

  //     await this.prisma.room.update({
  //       where: { id: room.id },
  //       data: {
  //         members: { push: friend.nickname },
  //       },
  //     });
  //   }

  //   pushToEntities(entities: UserEntity[], user: User) {
  //     entities.push({
  //       id: user.id,
  //       nickname: user.nickname,
  //       pictureURL: user.pictureUrl,
  //       status: user.isOnline ? 'online' : 'offline',
  //       isFriendToLoggedUser: true,
  //       friendsNumber: 0,
  //     });
  //   }

  //   async setAdmin(
  //     user: AttachedUserEntity,
  //     data: { channelId: string; memberId: string },
  //   ) {
  //     const friend = await this.prisma.user.findUnique({
  //       where: {
  //         id: data.memberId,
  //       },
  //     });

  //     const room = await this.prisma.room.findUnique({
  //       where: {
  //         id: data.channelId,
  //       },
  //     });

  //     if (room.owner !== user.nickname)
  //       throw new ForbiddenException('you are not owner');
  //     const id1 = room.admins.find((login) => login === friend.nickname);
  //     if (id1) throw new ForbiddenException('already admins');
  //     const id2 = room.members.find((login) => login === friend.nickname);
  //     if (!id2) throw new ForbiddenException('is not member');

  //     await this.prisma.room.update({
  //       where: {
  //         id: room.id,
  //       },
  //       data: {
  //         admins: {
  //           push: friend.nickname,
  //         },
  //       },
  //     });
  //   }

  //   async blockMember(
  //     user: AttachedUserEntity,
  //     data: { channelId: string; memberId: string },
  //   ) {
  //     const friend = await this.prisma.user.findUnique({
  //       where: {
  //         id: data.memberId,
  //       },
  //     });

  //     const room = await this.prisma.room.findUnique({
  //       where: {
  //         id: data.channelId,
  //       },
  //     });

  //     const id1 = room.admins.find((login) => login === user.nickname);
  //     if (!id1) throw new ForbiddenException('you are  Not admins');
  //     const id2 = room.admins.find((login) => login === friend.nickname);
  //     if (id2 && room.owner != user.nickname)
  //       throw new ForbiddenException(
  //         'you are not owner, impossiple to remove admin',
  //       );

  //     await this.prisma.room.update({
  //       where: {
  //         id: room.id,
  //       },
  //       data: {
  //         members: {
  //           set: room.members.filter((login) => login !== friend.nickname),
  //         },
  //       },
  //     });

  //     if (id2) {
  //       await this.prisma.room.update({
  //         where: {
  //           id: room.id,
  //         },
  //         data: {
  //           admins: {
  //             set: room.admins.filter((login) => login !== friend.nickname),
  //           },
  //         },
  //       });
  //     }
  //     await this.prisma.room.update({
  //       where: {
  //         id: room.id,
  //       },
  //       data: {
  //         blocked: {
  //           push: friend.nickname,
  //         },
  //       },
  //     });
  //   }

  //   async kickMember(
  //     user: AttachedUserEntity,
  //     data: { channelId: string; memberId: string },
  //   ) {
  //     const friend = await this.prisma.user.findUnique({
  //       where: { id: data.memberId },
  //     });

  //     const room = await this.prisma.room.findUnique({
  //       where: { id: data.channelId },
  //     });

  //     const id1 = room.admins.find((login) => login === user.nickname);
  //     if (!id1) throw new ForbiddenException('you are  Not admins');
  //     const id2 = room.admins.find((login) => login === friend.nickname);
  //     if (id2 && room.owner !== user.nickname)
  //       throw new ForbiddenException(
  //         'you are not owner, impossiple to remove admin',
  //       );

  //     await this.prisma.room.update({
  //       where: {
  //         id: room.id,
  //       },
  //       data: {
  //         members: {
  //           set: room.members.filter((login) => login !== friend.nickname),
  //         },
  //       },
  //     });

  //     if (id2) {
  //       await this.prisma.room.update({
  //         where: {
  //           id: room.id,
  //         },
  //         data: {
  //           admins: {
  //             set: room.admins.filter((login) => login !== friend.nickname),
  //           },
  //         },
  //       });
  //     }
  //   }

  //   async unblockMember(
  //     user: AttachedUserEntity,
  //     data: { channelId: string; memberId: string },
  //   ) {
  //     const friend = await this.prisma.user.findUnique({
  //       where: { id: data.memberId },
  //     });

  //     const room = await this.prisma.room.findUnique({
  //       where: { id: data.channelId },
  //     });

  //     if (!room.admins.includes(user.nickname)) {
  //       throw new ForbiddenException('you are Not an admin');
  //     }

  //     await this.prisma.room.update({
  //       where: { id: room.id },
  //       data: {
  //         blocked: {
  //           set: room.blocked.filter((nickname) => nickname !== friend.nickname),
  //         },
  //       },
  //     });

  //     await this.prisma.room.update({
  //       where: { id: room.id },
  //       data: {
  //         members: {
  //           push: friend.nickname,
  //         },
  //       },
  //     });
  //   }

  //   async leaveChannel(user: any, rom: any) {
  //     const rooms = await this.prisma.room.findUnique({
  //       where: {
  //         name: rom.name,
  //       },
  //     });
  //     const id1 = rooms.admins.find((login) => login === user.nickname);
  //     if (id1) {
  //       await this.prisma.room.update({
  //         where: {
  //           name: rom.name,
  //         },
  //         data: {
  //           admins: {
  //             set: rooms.admins.filter((log) => log !== user.nickname),
  //           },
  //         },
  //       });
  //     }
  //     await this.prisma.room.update({
  //       where: {
  //         name: rom.name,
  //       },
  //       data: {
  //         members: {
  //           set: rooms.members.filter((name) => name !== user.nickname),
  //         },
  //       },
  //     });
  //   }

  //   async deleteChannel(user: any, room: any) {
  //     await this.prisma.room.findUnique({
  //       where: {
  //         name: room.name,
  //       },
  //     });

  //     await this.prisma.room.delete({
  //       where: {
  //         name: room.name,
  //       },
  //     });

  //     return 'deleted';
  //   }

  //   /*
  //    * helper functions
  //    */

  //   getRole(room: Room, userNickname: string) {
  //     if (room.owner === userNickname) return 'OWNER';
  //     else if (room.admins.includes(userNickname)) return 'ADMIN';
  //     else if (room.members.includes(userNickname)) return 'MEMBER';
  //     else if (room.blocked.includes(userNickname)) return 'BLOCKED';
  //     else return '';
  //   }

  //   generateDMRoomName(id1: string, id2: string) {
  //     return id1 < id2 ? id1 + id2 : id2 + id1;
  //   }

  //   handleUnexpectedErrors(error: Error) {
  //     console.error(
  //       'Database connection error or other unexpected error:',
  //       error.stack,
  //     );

  //     throw new InternalServerErrorException(
  //       'An unexpected error occurred. Please try again later',
  //     );
  //   }
}
