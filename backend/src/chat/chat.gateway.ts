import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from './chat.service';
import * as moment from 'moment';

@WebSocketGateway(+process.env.BACKEND_CHAT_PORT, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    allowedHeaders: ['Cookie'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private chatService: ChatService,
  ) {}

  @WebSocketServer() server: Server;
  onlineClients = [];
  id = 0;

  @SubscribeMessage('msgServer')
  async handleMessage(
    @ConnectedSocket() client: any,
    @MessageBody() Body: any,
  ) {
    const user = client.user;
    this.id += 1;
    let roomName = `<${user.nickname}_${this.id}>`;

    if (Body.type === 'DM') {
      const friendUser = await this.prisma.user.findUnique({
        where: {
          nickname: Body.name,
        },
      });
      // for (let index = 0; index < this.onlineClients.length; index++) {
      //   if (
      //     this.onlineClients[index].user.nickname == friendUser.nickname ||
      //     this.onlineClients[index].user.nickname == user.nickname
      //   ) {
      //     this.onlineClients[index].join(roomName);
      //   }
      // }
      /*
        room: {
          id: 'd1a2a15f-84c5-4bec-82a4-f7643b37ca97',
          name: 'hamidnajielidrissihamidnaji981',
          owner: 'hamidnaji981',
          members: [ 'hamidnaji981', 'hamidnajielidrissi' ],
          blocked: [],
          type: 'personnel',
          admins: [ 'hamidnaji981' ],
          hash: null
        }
        */
      const room = await this.prisma.room.findUnique({
        where: {
          name: friendUser.nickname + user.nickname,
        },
      });
      if (room) {
        await this.prisma.messages.create({
          data: {
            roomName: friendUser.nickname + user.nickname,
            data: Body.data,
            userLogin: friendUser.nickname,
          },
        });
        this.server
          .to(roomName)
          .emit(
            'msgFromServer',
            await this.chatService.emit_message(user, room, 'chat'),
          );
        for (let index = 0; index < this.onlineClients.length; index++) {
          if (this.onlineClients[index].user.nickname == user.nickname) {
            client.emit(
              'msgFromServer',
              await this.chatService.emit_message(friendUser, room, 'chat'),
            );
          }
        }
      } else {
        console.log('else condition');

        const room_freind = await this.prisma.room.findUnique({
          where: {
            name: user.nickname + friendUser.nickname,
          },
        });
        if (room_freind) {
          console.log('i was here room_friend');

          const msg = await this.prisma.messages.create({
            data: {
              roomName: user.nickname + friendUser.nickname,
              data: Body.data,
              userLogin: friendUser.nickname,
            },
          });
          this.server
            .to(roomName)
            .emit(
              'msgFromServer',
              await this.chatService.emit_message(user, room_freind, 'chat'),
            );
          for (let index = 0; index < this.onlineClients.length; index++) {
            if (this.onlineClients[index].user.nickname == user.nickname) {
              client.emit(
                'msgFromServer',
                await this.chatService.emit_message(
                  friendUser,
                  room_freind,
                  'chat',
                ),
              );
            }
          }
        } else return;
      }
    } else {
      const rom = await this.prisma.room.findUnique({
        where: {
          name: Body.name,
        },
      });
      const user2 = await this.prisma.muted.findMany({
        where: {
          userLogin: user.nickname,
          roomName: Body.name,
        },
      });
      if (user2[0]) {
        if (user2[0].time < moment().format('YYYY-MM-DD hh:mm:ss')) {
          this.chatService.unmuted(user, Body);
        } else return;
      }
      if (rom) {
        for (let i = 0; i < this.onlineClients.length; i++) {
          const login = rom.members.find(
            (login) => login == this.onlineClients[i].user.nickname,
          );
          if (login) this.onlineClients[i].join(roomName);
        }
        const msg = await this.prisma.messages.create({
          data: {
            roomName: Body.name,
            data: Body.data,
            userLogin: user.nickname,
          },
        });
        this.server
          .to(roomName)
          .emit(
            'msgFromServer',
            await this.chatService.emit_messagetoRoom(user, rom),
          );
      }
    }
  }

  async handleDisconnect(@ConnectedSocket() client: any) {
    const jwtToken = this.chatService.getJwtTokenFromClient(client);
    const user = await this.chatService.getUserFromJwtToken(jwtToken);

    // Clean up the client
    for (let index = 0; index < this.onlineClients.length; index++) {
      if (this.onlineClients[index].id === client.id) {
        this.onlineClients.splice(index, 1);
        break;
      }
    }

    if (!user) {
      console.warn(
        `[Chat]: Unauthorized disconnection happend from client: ${client.id}`,
      );
      return;
    }

    try {
      if (user.status === 'online') {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            status: 'offline',
          },
        });
      }
      console.log(
        `[Chat]: Client disconnected: ${client.id} (user: ${user.id})`,
      );
    } catch (error) {
      console.error(
        `[Chat]: Error during disconnection handling for client ${client.id} (user: ${user.id}):`,
        error,
      );
    }
  }

  async handleConnection(@ConnectedSocket() client: any) {
    const jwtToken = this.chatService.getJwtTokenFromClient(client);
    const user = await this.chatService.getUserFromJwtToken(jwtToken);

    if (!user) {
      client.emit('error', 'unauthorized');
      client.disconnect();
      console.warn(
        `[Chat]: Unauthorized connection attempt from client: ${client.id}`,
      );
      return;
    }

    client.user = user;

    try {
      if (user.status === 'offline') {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            status: 'online',
          },
        });
      }
      this.onlineClients.push(client); // TODO: This line needs further checkes...
      console.log(`[Chat]: Client connected: ${client.id} (user: ${user.id})`);
    } catch (error) {
      client.emit('error', 'unauthorized');
      client.disconnect();
      console.error(
        `[Chat]: Error during connection handling for client ${client.id} (user: ${user.id}):`,
        error,
      );
    }
  }
}
