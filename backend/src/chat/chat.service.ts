import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  chanel,
  RoomMsgsType,
  userchanel,
  Searchchanel,
  chanelprotected,
} from './utils/typeObjects';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import * as cookie from 'cookie';
import { UserEntity } from 'src/users/entities/user.entity';
import { Prisma, Room } from '@prisma/client';
import { User } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  getJwtTokenFromClient(client: any) {
    const cookies: { [key: string]: string } = cookie.parse(
      client.handshake.headers.cookie || '',
    );

    return cookies.jwt;
  }

  async getUserFromJwtToken(
    jwtToken: string | undefined,
  ): Promise<User | undefined> {
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

  async getRoomMsgs(
    user: User,
    room: Room,
    type: string,
  ): Promise<RoomMsgsType> {
    const roomMsgs = await this.prisma.room.findUnique({
      where: {
        name: room.name,
      },
      select: {
        messages: true,
      },
    });

    // TODO: what's if roomMsgs is null

    return {
      id: user.id,
      username: user.nickname,
      status: user.status,
      picture: user.pictureURL,
      type: type,
      latestMessage: roomMsgs.messages[roomMsgs.messages.length - 1].data,
      conversation: roomMsgs.messages.map((msg) => ({
        type: msg.receiverUser === user.nickname ? 'user' : 'friend',
        message: msg.data,
      })),
    };
  }

  async emit_messagetoRoom(user: any, room: any): Promise<chanel> {
    const allmessage = await this.prisma.room.findUnique({
      where: {
        name: room.name,
      },
      select: {
        messages: true,
      },
    });
    let role;
    if (room.owner === user.nickname) role = 'owner';
    else {
      const admin = room.admins.find((login) => login === user.nickname);
      if (admin) role = 'admins';
      else role = 'members';
    }
    const person: chanel = {
      id: room.id,
      name: room.name,
      members: room.members.length,
      latestMessage: '',
      role: role,
      type: room.type,
      conversation: [],
    };
    person.conversation = allmessage.messages.map(() => ({
      login: '',
      message: '',
      picture: '',
    }));
    const message_user = await this.prisma.messages.findFirst({
      where: {
        roomName: room.name,
      },
    });
    if (message_user) {
      person.latestMessage =
        allmessage.messages[allmessage.messages.length - 1].data;
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

  generateDMRoomName (id1: string, id2: string) {
    return id1 < id2 ? id1 + id2 : id2 + id1;
  };

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
    const message_user = await this.prisma.messages.findFirst({
      where: {
        roomName: name,
      },
    });

    const person: chanel = {
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
        allmessage.messages[allmessage.messages.length - 1].data;
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
    const message_user = await this.prisma.messages.findFirst({
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
        allmessage.messages[allmessage.messages.length - 1].data;
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
        join: 'NON',
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

  async getDMWithAllUsers(type: string, user1: any): Promise<RoomMsgsType[]> {
    const obj: RoomMsgsType[] = [];
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
        const message_user = await this.prisma.messages.findFirst({
          where: {
            roomName: rooms[index].name,
          },
        });
        if (!message_user) continue;
        const person: RoomMsgsType = {
          id: user.id,
          username: user.nickname,
          status: user.status,
          latestMessage: '',
          picture: user.pictureURL,
          conversation: [],
          type: 'non',
        };
        if (message_user) {
          person.latestMessage =
            allmessage.messages[allmessage.messages.length - 1].data;
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

    for (const x of user1.requester) {
      if (x.type !== 'FRIENDSHIP') continue;
      const friend = await this.prisma.user.findUnique({
        where: { id: x.addresseeId },
      });
      let index = 0;
      for (index; index < obj.length; index++) {
        if (friend.nickname === obj[index].username) break;
      }
      if (index === obj.length && friend.nickname !== user1.nickname) {
        const person: RoomMsgsType = {
          id: friend.id,
          username: friend.nickname,
          status: friend.status,
          latestMessage: '',
          picture: friend.pictureURL,
          conversation: [],
          type: 'non',
        };
        obj.push(person);
      }
    }

    for (const x of user1.addressee) {
      if (x.type !== 'FRIENDSHIP') continue;
      const friend = await this.prisma.user.findUnique({
        where: { id: x.requesterId },
      });
      let index = 0;
      for (index; index < obj.length; index++) {
        if (friend.nickname === obj[index].username) break;
      }
      if (index === obj.length && friend.nickname !== user1.nickname) {
        const person: RoomMsgsType = {
          id: friend.id,
          username: friend.nickname,
          status: friend.status,
          latestMessage: '',
          picture: friend.pictureURL,
          conversation: [],
          type: 'non',
        };
        obj.push(person);
      }
    }

    return obj;
  }

  async getDM(type: string, user1: any): Promise<RoomMsgsType[]> {
    const obj: RoomMsgsType[] = [];
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
        const message_user = await this.prisma.messages.findFirst({
          where: {
            roomName: rooms[index].name,
          },
        });
        if (!message_user) continue;
        const person: RoomMsgsType = {
          id: user.id,
          username: user.nickname,
          status: user.status,
          latestMessage: '',
          picture: user.pictureURL,
          conversation: [],
          type: 'non',
        };
        if (message_user) {
          person.latestMessage =
            allmessage.messages[allmessage.messages.length - 1].data;
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

  async getRM(user: any): Promise<any> {
    const rooms = await this.prisma.room.findMany({
      where: {
        OR: [{ type: 'PROTECTED' }, { type: 'PUBLIC' }, { type: 'PRIVATE' }],
      },
    });
    const obj = [];
    for (let index = 0; index < rooms.length; index++) {
      const id1 = rooms[index].members.find((login) => login === user.nickname);
      if (id1) {
        const allmessage = await this.prisma.room.findUnique({
          where: {
            name: rooms[index].name,
          },
          select: {
            messages: true,
          },
        });
        let role: string;
        if (rooms[index].owner === user.nickname) role = 'owner';
        else {
          const admin = rooms[index].admins.find(
            (login) => login === user.nickname,
          );
          if (admin) role = 'admin';
          else role = 'member';
        }
        const person = {
          id: rooms[index].id,
          name: rooms[index].name,
          members: rooms[index].members.length,
          latestMessage: '',
          role: role,
          type: rooms[index].type,
          conversation: [],
          join: 'YES',
        };
        person.conversation = allmessage.messages.map(() => ({
          login: '',
          message: '',
          picture: '',
          type: '',
        }));
        const message_user = await this.prisma.messages.findFirst({
          where: {
            roomName: rooms[index].name,
          },
        });
        if (message_user) {
          person.latestMessage =
            allmessage.messages[allmessage.messages.length - 1].data;
          person.conversation = allmessage.messages.map((x) => ({
            login: '',
            message: x.data,
            picture: '',
            type: '',
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
        obj.push(person);
      }
    }
    for (let index = 0; index < rooms.length; index++) {
      const id1 = rooms[index].members.find((login) => login === user.nickname);
      const isBlock = rooms[index].blocked.find(
        (login) => login === user.nickname,
      );
      if (!id1 && !isBlock && rooms[index].type !== 'PRIVATE') {
        const allmessage = await this.prisma.room.findUnique({
          where: {
            name: rooms[index].name,
          },
          select: {
            messages: true,
          },
        });
        const person = {
          id: rooms[index].id,
          name: rooms[index].name,
          members: rooms[index].members.length,
          latestMessage: '',
          role: '',
          type: rooms[index].type,
          conversation: [],
          join: 'NON',
        };
        person.conversation = allmessage.messages.map(() => ({
          login: '',
          message: '',
          picture: '',
          type: '',
        }));
        const message_user = await this.prisma.messages.findFirst({
          where: {
            roomName: rooms[index].name,
          },
        });
        if (message_user) {
          person.latestMessage =
            allmessage.messages[allmessage.messages.length - 1].data;
          person.conversation = allmessage.messages.map((x) => ({
            login: '',
            message: x.data,
            picture: '',
            type: '',
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
}
