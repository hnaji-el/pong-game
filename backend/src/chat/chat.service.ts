import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  ChannelType,
  DmType,
  MemberType,
  Searchchanel,
  chanelprotected,
} from './entities/chat.entity';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import * as cookie from 'cookie';
import { UserEntity } from 'src/users/entities/user.entity';
import { Prisma, Room } from '@prisma/client';
import { User } from '@prisma/client';
import { AttachedUserEntity } from 'src/users/entities/attachedUser.entity';

// TODO: delete the `pictureURL` from `Message` Model, and instead of that query for it from `User` Model.

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  getJwtTokenFromClient(client: any) {
    const cookies: { [key: string]: string } = cookie.parse(
      client.handshake.headers.cookie || '',
    );

    return cookies.jwt;
  }

  async getUserFromJwtToken(jwtToken?: string): Promise<User | undefined> {
    if (!jwtToken) return;

    let user: User | undefined;

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
      return;
    }

    return user;
  }

  async getDmData(room: Room, user: User): Promise<DmType> {
    try {
      const roomMsgs = await this.prisma.room.findUnique({
        where: {
          name: room.name,
        },
        select: {
          messages: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      return {
        id: user.id,
        nickname: user.nickname,
        pictureURL: user.pictureURL,
        status: user.status,
        type: room.type,
        latestMessage:
          roomMsgs.messages[roomMsgs.messages.length - 1]?.data ?? '',
        messages: roomMsgs.messages.map((msg) => ({
          id: msg.id,
          roomName: msg.roomName,
          userId: msg.userId,
          pictureURL: msg.pictureURL,
          data: msg.data,
        })),
      };
    } catch (error) {
      this.handleUnexpectedErrors(error);
    }
  }

  async getDmsData(user: AttachedUserEntity): Promise<DmType[]> {
    try {
      const rooms = await this.prisma.room.findMany({
        where: {
          type: 'DM',
          members: {
            has: user.nickname,
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      const dmsData = await Promise.all(
        rooms.map(async (room) => {
          const friend = await this.prisma.user.findUnique({
            where: {
              nickname:
                user.nickname === room.members[0]
                  ? room.members[1]
                  : room.members[0],
            },
          });

          return this.getDmData(room, friend);
        }),
      );

      return dmsData;
    } catch (error) {
      // Re-throw InternalServerErrorException if it has already been thrown, without logging it again.
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      this.handleUnexpectedErrors(error);
    }
  }

  async getChannelData(
    room: Room,
    user: User,
    isJoined: boolean,
  ): Promise<ChannelType> {
    try {
      const roomMsgs = await this.prisma.room.findUnique({
        where: {
          name: room.name,
        },
        select: {
          messages: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      return {
        id: room.id,
        name: room.name,
        members: room.members.length,
        role: this.getRole(room, user.nickname),
        type: room.type,
        latestMessage:
          roomMsgs.messages[roomMsgs.messages.length - 1]?.data ?? '',
        messages: roomMsgs.messages.map((msg) => ({
          id: msg.id,
          roomName: msg.roomName,
          userId: msg.userId,
          pictureURL: msg.pictureURL,
          data: msg.data,
        })),
        isJoined: isJoined,
      };
    } catch (error) {
      this.handleUnexpectedErrors(error);
    }
  }

  async getChannelsData(user: AttachedUserEntity): Promise<ChannelType[]> {
    try {
      const rooms = await this.prisma.room.findMany({
        where: {
          OR: [{ type: 'PROTECTED' }, { type: 'PUBLIC' }, { type: 'PRIVATE' }],
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      const channelsData = (
        await Promise.all(
          rooms.map(async (room) => {
            const isMember = room.members.includes(user.nickname);
            const isBlocked = room.blocked.includes(user.nickname);

            if (isMember) {
              return this.getChannelData(room, user, true);
            }

            if (!isMember && !isBlocked && room.type !== 'PRIVATE') {
              return this.getChannelData(room, user, false);
            }
          }),
        )
      ).filter((data) => data !== undefined);

      return channelsData;
    } catch (error) {
      // Re-throw InternalServerErrorException if it has already been thrown, without logging it again.
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      this.handleUnexpectedErrors(error);
    }
  }

  async createRoom(
    name: string,
    owner: string,
    members: string[],
    type: string,
    password?: string,
  ) {
    if (type === 'PROTECTED' && !password) {
      throw new ForbiddenException('Password is required for protected rooms');
    }

    try {
      await this.prisma.room.create({
        data: {
          name: name,
          owner: owner,
          admins: [owner],
          members: [owner, ...members],
          type: type,
          ...(type === 'PROTECTED' && password
            ? {
                hashedPassword: bcrypt.hashSync(password, bcrypt.genSaltSync()),
              }
            : {}),
        },
      });
    } catch (error) {
      // handle unique constraint violation error
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException(
          'A room with this name already exists. Please choose a different name',
        );
      }

      // handle database connection error or other unexpected error
      console.error(
        'Database connection error or other unexpected error:',
        error.stack,
      );

      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later',
      );
    }
  }

  async getChannelMembers(
    user: AttachedUserEntity,
    channelId: string,
  ): Promise<MemberType[]> {
    const room = await this.prisma.room.findUnique({
      where: { id: channelId },
    });

    const filteredMembers = [
      ...room.members.filter((nickname) => nickname !== user.nickname),
      ...room.blocked.filter((nickname) => nickname !== user.nickname),
    ];

    const members = await Promise.all(
      filteredMembers.map(async (member) => {
        const memberData = await this.prisma.user.findUnique({
          where: { nickname: member },
        });

        return {
          id: memberData.id,
          nickname: memberData.nickname,
          status: memberData.status,
          pictureURL: memberData.pictureURL,
          role: this.getRole(room, memberData.nickname),
        };
      }),
    );

    return members;
  }

  async getChannelNonMemberFriends(
    user: AttachedUserEntity,
    channelId: string,
  ): Promise<MemberType[]> {
    const nonMemberFriends = [];
    const room = await this.prisma.room.findUnique({
      where: { id: channelId },
    });

    for (const { type, addresseeId } of user.requester) {
      if (type !== 'FRIENDSHIP') continue;

      const friend = await this.prisma.user.findUnique({
        where: { id: addresseeId },
      });

      if (
        !room.members.includes(friend.nickname) &&
        !room.blocked.includes(friend.nickname)
      ) {
        nonMemberFriends.push({
          id: friend.id,
          nickname: friend.nickname,
          status: friend.status,
          pictureURL: friend.pictureURL,
          role: '',
        });
      }
    }

    for (const { type, requesterId } of user.addressee) {
      if (type !== 'FRIENDSHIP') continue;

      const friend = await this.prisma.user.findUnique({
        where: { id: requesterId },
      });

      if (
        !room.members.includes(friend.nickname) &&
        !room.blocked.includes(friend.nickname)
      ) {
        nonMemberFriends.push({
          id: friend.id,
          nickname: friend.nickname,
          status: friend.status,
          pictureURL: friend.pictureURL,
          role: '',
        });
      }
    }

    return nonMemberFriends;
  }

  async joinRoom(user: any, name: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        name: name,
      },
    });

    if (!room) return;
    if (room.blocked) {
      const id_ban = room.blocked.find((login) => login === user.nickname);
      if (id_ban) throw new ForbiddenException('you are  banned');
    }

    const id1 = room.members.find((login) => login === user.nickname);
    if (id1) throw new ForbiddenException('already members');

    const userUpdate = await this.prisma.room.update({
      where: {
        name: name,
      },
      data: {
        members: {
          push: user.nickname,
        },
      },
    });

    const allmessage = await this.prisma.room.findUnique({
      where: {
        name: name,
      },
      select: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    const message_user = await this.prisma.message.findFirst({
      where: {
        roomName: name,
      },
    });

    const person: ChannelType = {
      id: userUpdate.id,
      name: userUpdate.name,
      members: userUpdate.members.length,
      latestMessage: '',
      role: 'MEMBER',
      type: userUpdate.type,
      messages: [],
      isJoined: true,
    };
    if (message_user) {
      person.latestMessage =
        allmessage.messages[allmessage.messages.length - 1]?.data ?? '';
      person.messages = allmessage.messages.map((msg) => ({
        id: msg.id,
        roomName: msg.roomName,
        userId: msg.userId,
        pictureURL: msg.pictureURL,
        data: msg.data,
      }));
    }
    return person;
  }

  async joinProtectedRoom(user: any, room: any) {
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: room.data.name,
      },
    });

    const matched = bcrypt.compareSync(
      room.data.password,
      rooms.hashedPassword,
    );
    if (!matched) {
      const person: chanelprotected = {
        id: '',
        name: '',
        members: 0,
        latestMessage: '',
        role: '',
        type: '',
        conversation: [],
        status: 'invalide',
      };
      return person;
    }
    const id_ban = rooms.blocked.find((login) => login === user.nickname);
    if (id_ban) throw new ForbiddenException('user banned');
    const id1 = rooms.members.find((login) => login === user.nickname);
    if (id1) throw new ForbiddenException('already members');
    const userUpdate = await this.prisma.room.update({
      where: {
        name: room.data.name,
      },
      data: {
        members: {
          push: user.nickname,
        },
      },
    });
    const allmessage = await this.prisma.room.findUnique({
      where: {
        name: room.data.name,
      },
      select: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    const message_user = await this.prisma.message.findFirst({
      where: {
        roomName: room.data.name,
      },
    });
    const person: chanelprotected = {
      id: userUpdate.id,
      name: userUpdate.name,
      members: userUpdate.members.length,
      latestMessage: '',
      role: 'MEMBER',
      type: userUpdate.type,
      conversation: [],
      status: 'valide',
    };
    if (message_user) {
      person.latestMessage =
        allmessage.messages[allmessage.messages.length - 1]?.data;
      person.conversation = allmessage.messages.map((x) => ({
        type: '',
        message: x.data,
        picture: '',
      }));
      for (let i = allmessage.messages.length - 1; i >= 0; i--) {
        const user_chanel = await this.prisma.user.findUnique({
          where: {
            nickname: allmessage.messages[i].userId,
          },
        });
        if (user.nickname === allmessage.messages[i].userId)
          person.conversation[i].type = 'user';
        else {
          person.conversation[i].type = 'MEMBER';
          person.conversation[i].picture = user_chanel.pictureURL;
        }
      }
    }
    return person;
  }

  async addToChannelNotPublic(
    user: AttachedUserEntity,
    data: {
      channelId: string;
      channelType: string;
      userId: string;
    },
  ) {
    const friend = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    const room = await this.prisma.room.findUnique({
      where: { id: data.channelId },
    });

    if (!room.admins.includes(user.nickname))
      throw new ForbiddenException('you are not an admin');

    if (room.blocked.includes(friend.nickname))
      throw new ForbiddenException('user blocked');

    if (room.members.includes(friend.nickname))
      throw new ForbiddenException('user already a member');

    await this.prisma.room.update({
      where: { id: room.id },
      data: {
        members: {
          push: friend.nickname,
        },
      },
    });
  }

  async addMember(data: {
    channelId: string;
    channelType: string;
    userId: string;
  }) {
    const friend = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    const room = await this.prisma.room.findUnique({
      where: { id: data.channelId },
    });

    if (room.blocked.includes(friend.nickname))
      throw new ForbiddenException('user blocked');

    if (room.members.includes(friend.nickname))
      throw new ForbiddenException('user already members');

    await this.prisma.room.update({
      where: { id: room.id },
      data: {
        members: { push: friend.nickname },
      },
    });
  }

  pushToEntities(entities: UserEntity[], user: any) {
    entities.push({
      id: user.id,
      nickname: user.nickname,
      pictureURL: user.pictureURL,
      status: user.status,
      isFriendToLoggedUser: true,
      friendsNumber: 0,
    });
  }

  async setAdmin(
    user: AttachedUserEntity,
    data: { channelId: string; memberId: string },
  ) {
    const friend = await this.prisma.user.findUnique({
      where: {
        id: data.memberId,
      },
    });

    const room = await this.prisma.room.findUnique({
      where: {
        id: data.channelId,
      },
    });

    if (room.owner !== user.nickname)
      throw new ForbiddenException('you are not owner');
    const id1 = room.admins.find((login) => login === friend.nickname);
    if (id1) throw new ForbiddenException('already admins');
    const id2 = room.members.find((login) => login === friend.nickname);
    if (!id2) throw new ForbiddenException('is not member');

    await this.prisma.room.update({
      where: {
        id: room.id,
      },
      data: {
        admins: {
          push: friend.nickname,
        },
      },
    });
  }

  async blockMember(
    user: AttachedUserEntity,
    data: { channelId: string; memberId: string },
  ) {
    const friend = await this.prisma.user.findUnique({
      where: {
        id: data.memberId,
      },
    });

    const room = await this.prisma.room.findUnique({
      where: {
        id: data.channelId,
      },
    });

    const id1 = room.admins.find((login) => login === user.nickname);
    if (!id1) throw new ForbiddenException('you are  Not admins');
    const id2 = room.admins.find((login) => login === friend.nickname);
    if (id2 && room.owner != user.nickname)
      throw new ForbiddenException(
        'you are not owner, impossiple to remove admin',
      );

    await this.prisma.room.update({
      where: {
        id: room.id,
      },
      data: {
        members: {
          set: room.members.filter((login) => login !== friend.nickname),
        },
      },
    });

    if (id2) {
      await this.prisma.room.update({
        where: {
          id: room.id,
        },
        data: {
          admins: {
            set: room.admins.filter((login) => login !== friend.nickname),
          },
        },
      });
    }
    await this.prisma.room.update({
      where: {
        id: room.id,
      },
      data: {
        blocked: {
          push: friend.nickname,
        },
      },
    });
  }

  async kickMember(
    user: AttachedUserEntity,
    data: { channelId: string; memberId: string },
  ) {
    const friend = await this.prisma.user.findUnique({
      where: { id: data.memberId },
    });

    const room = await this.prisma.room.findUnique({
      where: { id: data.channelId },
    });

    const id1 = room.admins.find((login) => login === user.nickname);
    if (!id1) throw new ForbiddenException('you are  Not admins');
    const id2 = room.admins.find((login) => login === friend.nickname);
    if (id2 && room.owner !== user.nickname)
      throw new ForbiddenException(
        'you are not owner, impossiple to remove admin',
      );

    await this.prisma.room.update({
      where: {
        id: room.id,
      },
      data: {
        members: {
          set: room.members.filter((login) => login !== friend.nickname),
        },
      },
    });

    if (id2) {
      await this.prisma.room.update({
        where: {
          id: room.id,
        },
        data: {
          admins: {
            set: room.admins.filter((login) => login !== friend.nickname),
          },
        },
      });
    }
  }

  async unblockMember(
    user: AttachedUserEntity,
    data: { channelId: string; memberId: string },
  ) {
    const friend = await this.prisma.user.findUnique({
      where: { id: data.memberId },
    });

    const room = await this.prisma.room.findUnique({
      where: { id: data.channelId },
    });

    if (!room.admins.includes(user.nickname)) {
      throw new ForbiddenException('you are Not an admin');
    }

    await this.prisma.room.update({
      where: { id: room.id },
      data: {
        blocked: {
          set: room.blocked.filter((nickname) => nickname !== friend.nickname),
        },
      },
    });

    await this.prisma.room.update({
      where: { id: room.id },
      data: {
        members: {
          push: friend.nickname,
        },
      },
    });
  }

  async leaveChannel(user: any, rom: any) {
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: rom.name,
      },
    });
    const id1 = rooms.admins.find((login) => login === user.nickname);
    if (id1) {
      await this.prisma.room.update({
        where: {
          name: rom.name,
        },
        data: {
          admins: {
            set: rooms.admins.filter((log) => log !== user.nickname),
          },
        },
      });
    }
    await this.prisma.room.update({
      where: {
        name: rom.name,
      },
      data: {
        members: {
          set: rooms.members.filter((name) => name !== user.nickname),
        },
      },
    });
  }

  async deleteChannel(user: any, room: any) {
    await this.prisma.room.findUnique({
      where: {
        name: room.name,
      },
    });

    await this.prisma.room.delete({
      where: {
        name: room.name,
      },
    });

    return 'deleted';
  }

  /*
   * helper functions
   */

  getRole(room: Room, userNickname: string) {
    if (room.owner === userNickname) return 'OWNER';
    else if (room.admins.includes(userNickname)) return 'ADMIN';
    else if (room.members.includes(userNickname)) return 'MEMBER';
    else if (room.blocked.includes(userNickname)) return 'BLOCKED';
    else return '';
  }

  generateDMRoomName(id1: string, id2: string) {
    return id1 < id2 ? id1 + id2 : id2 + id1;
  }

  handleUnexpectedErrors(error: Error) {
    console.error(
      'Database connection error or other unexpected error:',
      error.stack,
    );

    throw new InternalServerErrorException(
      'An unexpected error occurred. Please try again later',
    );
  }
}
