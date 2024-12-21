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
  userchanel,
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
          messages: true,
        },
      });

      return {
        id: user.id,
        username: user.nickname,
        picture: user.pictureURL,
        status: user.status,
        type: room.type,
        latestMessage:
          roomMsgs.messages[roomMsgs.messages.length - 1]?.data ?? '',
        conversation: roomMsgs.messages.map((msg) => ({
          type: msg.receiverUser === user.nickname ? 'user' : 'friend',
          message: msg.data,
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
    isJoined?: boolean,
  ): Promise<ChannelType> {
    try {
      const roomMsgs = await this.prisma.room.findUnique({
        where: {
          name: room.name,
        },
        select: {
          messages: true,
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
        conversation: roomMsgs.messages.map((msg) => ({
          login: msg.receiverUser,
          picture: msg.pictureURL,
          message: msg.data,
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
        messages: true,
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
      role: 'member',
      type: userUpdate.type,
      conversation: [],
    };
    if (message_user) {
      person.latestMessage =
        allmessage.messages[allmessage.messages.length - 1]?.data ?? '';
      person.conversation = allmessage.messages.map((x) => ({
        login: '',
        message: x.data,
        picture: '',
      }));
      for (let i = allmessage.messages.length - 1; i >= 0; i--) {
        const user_chanel = await this.prisma.user.findUnique({
          where: {
            nickname: allmessage.messages[i].receiverUser,
          },
        });
        person.conversation[i].login = user_chanel.nickname;
        person.conversation[i].picture = user_chanel.pictureURL;
      }
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
        messages: true,
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
      role: 'member',
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
            nickname: allmessage.messages[i].receiverUser,
          },
        });
        if (user.nickname === allmessage.messages[i].receiverUser)
          person.conversation[i].type = 'user';
        else {
          person.conversation[i].type = 'member';
          person.conversation[i].picture = user_chanel.pictureURL;
        }
      }
    }
    return person;
  }

  async addtoroomNopublic(user: any, room: any) {
    const user_friend = await this.prisma.user.findFirst({
      where: {
        nickname: room.data.login,
      },
    });
    const rooms = await this.prisma.room.findFirst({
      where: {
        name: room.data.name,
      },
    });
    const id1 = rooms.admins.find((login) => login === user.nickname);
    if (!id1) throw new ForbiddenException('you are  Not admins');
    await this.prisma.room.findUnique({
      where: {
        name: room.data.name,
      },
    });
    const id_ban = rooms.blocked.find(
      (login) => login === user_friend.nickname,
    );
    if (id_ban) throw new ForbiddenException('user banned');
    const user_members = rooms.members.find(
      (login) => login === user_friend.nickname,
    );
    if (user_members) throw new ForbiddenException('user already members');
    await this.prisma.room.update({
      where: {
        name: room.data.name,
      },
      data: {
        members: {
          push: user_friend.nickname,
        },
      },
    });
  }

  async addtoroom(user: any, room: any) {
    const user_friend = await this.prisma.user.findUnique({
      where: {
        nickname: room.data.login,
      },
    });
    const rooms = await this.prisma.room.findFirst({
      where: {
        name: room.data.name,
      },
    });
    await this.prisma.room.findUnique({
      where: {
        name: room.data.name,
      },
    });
    const id_ban = rooms.blocked.find(
      (login) => login === user_friend.nickname,
    );
    if (id_ban) throw new ForbiddenException('user banned');
    const user_members = rooms.members.find(
      (login) => login === user_friend.nickname,
    );
    if (user_members) throw new ForbiddenException('user already members');
    await this.prisma.room.update({
      where: {
        name: room.data.name,
      },
      data: {
        members: {
          push: user_friend.nickname,
        },
      },
    });
  }

  async getfriendNotjoinRoom(user: any, name: string) {
    const obj: UserEntity[] = [];
    const room = await this.prisma.room.findFirst({
      where: { name: name },
    });

    for (const x of user.requester) {
      if (x.type !== 'FRIENDSHIP') continue;
      const friend = await this.prisma.user.findUnique({
        where: { id: x.addresseeId },
      });
      const user_in_room = room.members.find(
        (login) => login === friend.nickname,
      );
      if (!user_in_room) {
        this.pushToEntities(obj, friend);
      }
    }

    for (const x of user.addressee) {
      if (x.type !== 'FRIENDSHIP') continue;
      const friend = await this.prisma.user.findUnique({
        where: { id: x.requesterId },
      });
      const user_in_room = room.members.find(
        (login) => login === friend.nickname,
      );
      if (!user_in_room) {
        this.pushToEntities(obj, friend);
      }
    }
    return obj;
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

  async getallUsersinRoom(user: any, name: string) {
    const rooms = await this.prisma.room.findFirst({
      where: {
        name: name,
      },
      select: {
        members: true,
        admins: true,
        owner: true,
        type: true,
      },
    });
    const obj: userchanel[] = [];
    for (let index = 0; index < rooms.members.length; index++) {
      if (rooms.members[index] === user.nickname) continue;
      const id1 = rooms.members.find((login) => login === rooms.members[index]);
      if (id1) {
        const user1 = await this.prisma.user.findUnique({
          where: {
            nickname: rooms.members[index],
          },
        });
        let role;
        if (rooms.owner === rooms.members[index]) role = 'owner';
        else {
          const admin = rooms.admins.find(
            (login) => login === rooms.members[index],
          );
          if (admin) role = 'admin';
          else role = 'member';
        }
        const person: userchanel = {
          id: user1.id,
          username: user1.nickname,
          status: user1.status,
          pictureLink: user1.pictureURL,
          role: role,
        };
        obj.push(person);
      }
    }
    return obj;
  }
  async getAllRooms(user: any) {
    const allRooms: Searchchanel[] = [];

    const rooms = await this.prisma.room.findMany();
    rooms.forEach((element) => {
      const obj = {
        id: element.id,
        admins: element.admins,
        members: element.members,
        name: element.name,
        type: element.type,
        owner: element.owner,
        blocked: element.blocked,
      };
      const id = obj.members.find((login) => login === user.nickname);
      const user_block = obj.blocked.find((login) => login === user.nickname);
      const room: Searchchanel = {
        name: obj.name,
        type: obj.type,
        isJoined: false,
      };
      if (
        !id &&
        (obj.type === 'PUBLIC' || obj.type === 'PROTECTED') &&
        !user_block
      )
        allRooms.push(room);
    });
    return allRooms;
  }

  async adduseradmins(user: any, room: any) {
    const user_friend = await this.prisma.user.findUnique({
      where: {
        nickname: room.data.login,
      },
    });
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: room.data.name,
      },
    });
    if (rooms.owner !== user.nickname)
      throw new ForbiddenException('you are not owner');
    const id1 = rooms.admins.find((login) => login === user_friend.nickname);
    if (id1) throw new ForbiddenException('already admins');
    const id2 = rooms.members.find((login) => login === user_friend.nickname);
    if (!id2) throw new ForbiddenException('is not member');
    await this.prisma.room.update({
      where: {
        name: room.data.name,
      },
      data: {
        admins: {
          push: user_friend.nickname,
        },
      },
    });
  }

  async banmember(user: any, room: any) {
    const user_friend = await this.prisma.user.findUnique({
      where: {
        nickname: room.data.login,
      },
    });
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: room.data.name,
      },
    });
    const id1 = rooms.admins.find((login) => login === user.nickname);
    if (!id1) throw new ForbiddenException('you are  Not admins');
    const id2 = rooms.admins.find((login) => login === user_friend.nickname);
    if (id2 && rooms.owner != user.nickname)
      throw new ForbiddenException(
        'you are not owner, impossiple to remove admin',
      );
    await this.prisma.room.update({
      where: {
        name: room.data.name,
      },
      data: {
        members: {
          set: rooms.members.filter((login) => login !== user_friend.nickname),
        },
      },
    });
    if (id2) {
      await this.prisma.room.update({
        where: {
          name: room.data.name,
        },
        data: {
          admins: {
            set: rooms.admins.filter((login) => login !== user_friend.nickname),
          },
        },
      });
    }
    await this.prisma.room.update({
      where: {
        name: room.data.name,
      },
      data: {
        blocked: {
          push: user_friend.nickname,
        },
      },
    });
  }

  async quickmember(user: any, room: any) {
    const user_friend = await this.prisma.user.findUnique({
      where: {
        nickname: room.data.login,
      },
    });
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: room.data.name,
      },
    });
    const id1 = rooms.admins.find((login) => login === user.nickname);
    if (!id1) throw new ForbiddenException('you are  Not admins');
    const id2 = rooms.admins.find((login) => login === user_friend.nickname);
    if (id2 && rooms.owner !== user.nickname)
      throw new ForbiddenException(
        'you are not owner, impossiple to remove admin',
      );
    await this.prisma.room.update({
      where: {
        name: room.data.name,
      },
      data: {
        members: {
          set: rooms.members.filter((login) => login !== user_friend.nickname),
        },
      },
    });
    if (id2) {
      await this.prisma.room.update({
        where: {
          name: room.data.name,
        },
        data: {
          admins: {
            set: rooms.admins.filter((login) => login !== user_friend.nickname),
          },
        },
      });
    }
  }

  async unblockfromroom(user: any, room: any) {
    const user_friend = await this.prisma.user.findUnique({
      where: {
        nickname: room.login,
      },
    });
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: room.name,
      },
    });
    const id1 = rooms.admins.find((login) => login === user.nickname);
    if (!id1) throw new ForbiddenException('you are  Not admins');
    await this.prisma.room.update({
      where: {
        name: room.name,
      },
      data: {
        blocked: {
          set: rooms.blocked.filter((login) => login !== user_friend.nickname),
        },
      },
    });
    await this.prisma.room.update({
      where: {
        name: room.name,
      },
      data: {
        members: {
          push: user_friend.nickname,
        },
      },
    });
  }

  async quite_room(user: any, rom: any) {
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

  async getMessage(name: string) {
    const allmessage = await this.prisma.room.findUnique({
      where: {
        name: name,
      },
      select: {
        messages: true,
      },
    });
    const v = allmessage.messages.length;
    return allmessage.messages[v - 1];
  }

  async getDM(type: string, user1: any): Promise<DmType[]> {
    const obj: DmType[] = [];
    const rooms = await this.prisma.room.findMany({
      where: {
        type: type,
      },
    });
    for (let index = 0; index < rooms.length; index++) {
      const id1 = rooms[index].members.find(
        (login) => login === user1.nickname,
      );
      if (id1) {
        let login: string;
        if (rooms[index].name === user1.nickname + rooms[index].members[0]) {
          login = rooms[index].members[0];
        } else login = rooms[index].members[1];
        const user = await this.prisma.user.findUnique({
          where: {
            nickname: login,
          },
        });
        const allmessage = await this.prisma.room.findUnique({
          where: {
            name: rooms[index].name,
          },
          select: {
            messages: true,
          },
        });
        const message_user = await this.prisma.message.findFirst({
          where: {
            roomName: rooms[index].name,
          },
        });
        if (!message_user) continue;
        const person: DmType = {
          id: user.id,
          username: user.nickname,
          status: user.status,
          latestMessage: '',
          picture: user.pictureURL,
          conversation: [],
          type: 'DM',
        };
        if (message_user) {
          person.latestMessage =
            allmessage.messages[allmessage.messages.length - 1]?.data ?? '';
          person.conversation = allmessage.messages.map((x) => ({
            type: '',
            message: x.data,
          }));
        }
        for (let i = allmessage.messages.length - 1; i >= 0; i--) {
          if (user1.nickname === allmessage.messages[i].receiverUser)
            person.conversation[i].type = 'friend';
          else person.conversation[i].type = 'user';
        }
        obj.push(person);
      }
    }
    return obj;
  }

  async muted(user: any, room: any) {
    const user_friend = await this.prisma.user.findUnique({
      where: {
        nickname: room.data.login,
      },
    });
    const rooms = await this.prisma.room.findUnique({
      where: {
        name: room.data.name,
      },
    });
    const id1 = rooms.admins.find((login) => login === user.nickname);
    if (!id1) throw new ForbiddenException('you are Not admins');
    const id2 = rooms.admins.find((login) => login === user_friend.nickname);
    if (id2 && rooms.owner !== user.nickname)
      throw new ForbiddenException(
        'you are not owner, impossiple to mute admin',
      );
    if (id2) {
      await this.prisma.room.update({
        where: {
          name: room.data.name,
        },
        data: {
          admins: {
            set: rooms.admins.filter((login) => login !== user_friend.nickname),
          },
        },
      });
    }
    const time = moment().add(1, 'm').format('YYYY-MM-DD hh:mm:ss');
    await this.prisma.muted.create({
      data: {
        roomName: room.data.name,
        receiverUser: user_friend.nickname,
        time: time,
      },
    });
  }

  async unmuted(user: any, room: any) {
    await this.prisma.muted.deleteMany({
      where: {
        AND: [{ receiverUser: user.nickname }, { roomName: room.name }],
      },
    });
  }

  async deleteroom(user: any, room: any) {
    const testOwner = await this.prisma.room.findUnique({
      where: {
        name: room.name,
      },
    });
    // const id1 = testOwner.admins.find((login) => login === user.nickname);
    // if (!id1) throw new ForbiddenException('you are not admin');

    const rom = await this.prisma.room.delete({
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
    if (room.owner === userNickname) return 'owner';
    else if (room.admins.includes(userNickname)) return 'admins';
    else return 'members';
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
