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
import { User } from '@prisma/client';

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
  connectedClients = [];
  id = 0;

  @SubscribeMessage('msgServer')
  async handleMessage(
    @ConnectedSocket() client: any,
    @MessageBody() Body: any,
  ) {
    const senderUser: User = client.user;
    this.id += 1;
    let wsRoomName = `<${senderUser.nickname}_${this.id}>`;

    if (Body.type === 'DM') {
      const receiverUser = await this.prisma.user.findUnique({
        where: {
          nickname: Body.name,
        },
      });

      this.connectedClients.forEach((client) => {
        if (
          client.user.id === senderUser.id ||
          client.user.id === receiverUser.id
        ) {
          client.join(wsRoomName);
        }
      });

      const room = await this.prisma.room.findUnique({
        where: {
          name: receiverUser.nickname + senderUser.nickname,
        },
      });

      if (room) {
        await this.prisma.messages.create({
          data: {
            roomName: receiverUser.nickname + senderUser.nickname,
            data: Body.data,
            userLogin: receiverUser.nickname,
          },
        });

        this.server
          .to(wsRoomName)
          .emit(
            'msgFromServer',
            await this.chatService.getRoomMsgs(senderUser, room, 'chat'),
          );

        for (const client of this.connectedClients) {
          if (client.user.nickname === senderUser.nickname) {
            client.emit(
              'msgFromServer',
              await this.chatService.getRoomMsgs(receiverUser, room, 'chat'),
            );
          }
        }
      } else {
        const room_freind = await this.prisma.room.findUnique({
          where: {
            name: senderUser.nickname + receiverUser.nickname,
          },
        });
        if (room_freind) {
          console.log('i was here room_friend');

          await this.prisma.messages.create({
            data: {
              roomName: senderUser.nickname + receiverUser.nickname,
              data: Body.data,
              userLogin: receiverUser.nickname,
            },
          });
          this.server
            .to(wsRoomName)
            .emit(
              'msgFromServer',
              await this.chatService.getRoomMsgs(
                senderUser,
                room_freind,
                'chat',
              ),
            );
          for (let index = 0; index < this.connectedClients.length; index++) {
            if (
              this.connectedClients[index].user.nickname == senderUser.nickname
            ) {
              client.emit(
                'msgFromServer',
                await this.chatService.getRoomMsgs(
                  receiverUser,
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
          userLogin: senderUser.nickname,
          roomName: Body.name,
        },
      });
      if (user2[0]) {
        if (user2[0].time < moment().format('YYYY-MM-DD hh:mm:ss')) {
          this.chatService.unmuted(senderUser, Body);
        } else return;
      }
      if (rom) {
        for (let i = 0; i < this.connectedClients.length; i++) {
          const login = rom.members.find(
            (login) => login == this.connectedClients[i].user.nickname,
          );
          if (login) this.connectedClients[i].join(wsRoomName);
        }
        const msg = await this.prisma.messages.create({
          data: {
            roomName: Body.name,
            data: Body.data,
            userLogin: senderUser.nickname,
          },
        });
        this.server
          .to(wsRoomName)
          .emit(
            'msgFromServer',
            await this.chatService.emit_messagetoRoom(senderUser, rom),
          );
      }
    }
  }

  async handleDisconnect(@ConnectedSocket() client: any) {
    const jwtToken = this.chatService.getJwtTokenFromClient(client);
    const user = await this.chatService.getUserFromJwtToken(jwtToken);

    // Clean up the client
    for (let index = 0; index < this.connectedClients.length; index++) {
      if (this.connectedClients[index].id === client.id) {
        this.connectedClients.splice(index, 1);
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
        `[Chat]: Client disconnected: ${client.id} (user: ${user.nickname})`,
      );
    } catch (error) {
      console.error(
        `[Chat]: Error during disconnection handling for client ${client.id} (user: ${user.nickname}):`,
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
      this.connectedClients.push(client); // TODO: This line needs further checkes...
      console.log(
        `[Chat]: Client connected: ${client.id} (user: ${user.nickname})`,
      );
    } catch (error) {
      client.emit('error', 'unauthorized');
      client.disconnect();
      console.error(
        `[Chat]: Error during connection handling for client ${client.id} (user: ${user.nickname}):`,
        error,
      );
    }
  }
}
