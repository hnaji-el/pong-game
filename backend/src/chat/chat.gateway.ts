import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from './chat.service';
import { UsersService } from 'src/users/users.service';
import * as cookie from 'cookie';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Message } from './entities/chat.entity';

interface AuthenticatedSocket extends Socket {
  user?: User;
}

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
    private usersService: UsersService,
  ) {}

  @WebSocketServer() server: Server;
  connectedClients: AuthenticatedSocket[] = [];

  @SubscribeMessage('FromClient')
  async handleMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody()
    msgData: {
      isDm: boolean;
      chatId: string;
      content: string;
    },
  ) {
    const senderUser = client.user;

    if (msgData.isDm) {
      const dm = await this.prisma.dM.findUnique({
        where: { id: msgData.chatId },
      });

      const receiverId = dm.user1Id === senderUser.id ? dm.user2Id : dm.user1Id;

      if (!(await this.usersService.isFriends(senderUser.id, receiverId))) {
        return;
      }

      const message = await this.prisma.dMMessage.create({
        data: {
          dmId: dm.id,
          senderId: senderUser.id,
          content: msgData.content,
        },
      });
      await this.prisma.dM.update({
        where: {
          id: dm.id,
        },
        data: {
          updatedAt: new Date(),
        },
      });

      const wsRoom = randomUUID();

      // add the connected clients associated with either the sender or receiver user to the WebSocket room.
      for (const client of this.connectedClients) {
        if (client.user.id === senderUser.id || client.user.id === receiverId) {
          client.join(wsRoom);
        }
      }

      this.server.to(wsRoom).emit('FromServer', {
        id: message.id,
        chatId: dm.id,
        senderId: senderUser.id,
        senderPictureUrl: senderUser.pictureUrl,
        content: message.content,
        sentAt: message.sentAt.toISOString(),
      } as Message);
    } else {
      const channel = await this.prisma.channel.findUnique({
        where: {
          id: msgData.chatId,
        },
        select: {
          id: true,
          memberships: {
            where: {
              role: { not: 'BLOCKED' },
            },
            select: {
              user: {
                select: {
                  id: true,
                  pictureUrl: true,
                },
              },
            },
          },
        },
      });

      if (!channel) return;

      const usersInChannel = channel.memberships.map((m) => m.user);

      const message = await this.prisma.channelMessage.create({
        data: {
          channelId: channel.id,
          senderId: senderUser.id,
          content: msgData.content,
        },
      });
      await this.prisma.channel.update({
        where: {
          id: channel.id,
        },
        data: {
          updatedAt: new Date(),
        },
      });

      const wsRoom = randomUUID();

      // add the connected clients associated with room members to the Web Socket room (wsRoom).
      for (const user of usersInChannel) {
        for (const client of this.connectedClients) {
          if (user.id === client.user.id) {
            client.join(wsRoom);
            break;
          }
        }
      }

      this.server.to(wsRoom).emit('FromServer', {
        id: message.id,
        chatId: channel.id,
        senderId: senderUser.id,
        senderPictureUrl: senderUser.pictureUrl,
        content: message.content,
        sentAt: message.sentAt.toISOString(),
      } as Message);
    }

    // if (!wsData.isDm) {
    //   const wsRoom = randomUUID();
    //   const room = await this.prisma.room.findUnique({
    //     where: {
    //       id: wsData.channelId,
    //     },
    //   });
    //   if (!room) return;
    //   // add the connected clients associated with room members to the Web Socket room (wsRoom).
    //   for (const client of this.connectedClients) {
    //     if (room.members.includes(client.user.nickname)) {
    //       client.join(wsRoom);
    //     }
    //   }
    //   await this.prisma.message.create({
    //     data: {
    //       roomName: room.name,
    //       userId: senderUser.id,
    //       pictureURL: senderUser.pictureURL,
    //       data: wsData.data,
    //     },
    //   });
    //   await this.prisma.room.update({
    //     where: {
    //       id: room.id,
    //     },
    //     data: {
    //       updatedAt: new Date(),
    //     },
    //   });
    //   this.server.to(wsRoom).emit(
    //     'msgFromServer',
    //     await this.chatService.getChannelData(room, senderUser, true), // TODO: handle the case when this function throw an InternalServerErrorException
    //   );
    // }
  }

  async handleDisconnect(@ConnectedSocket() client: AuthenticatedSocket) {
    const { jwt } = cookie.parse(client.handshake.headers.cookie || '');
    const user = await this.chatService.getUserFromJwtToken(jwt);

    const index = this.connectedClients.findIndex(
      (element) => element.id === client.id,
    );

    // Clean up the client
    if (index !== -1) this.connectedClients.splice(index, 1);

    if (!user) {
      console.log(
        `[Chat]: Unauthorized disconnection happend from client: ${client.id}`,
      );
      return;
    }

    console.log(
      `[Chat]: Client disconnected: ${client.id} (user: ${user.nickname})`,
    );
  }

  async handleConnection(@ConnectedSocket() client: AuthenticatedSocket) {
    const { jwt } = cookie.parse(client.handshake.headers.cookie || '');
    const user = await this.chatService.getUserFromJwtToken(jwt);

    if (!user) {
      client.disconnect();
      console.log(
        `[Chat]: Unauthorized connection attempt from client: ${client.id}`,
      );
      return;
    }

    client.user = user;
    this.connectedClients.push(client);

    console.log(
      `[Chat]: Client connected: ${client.id} (user: ${user.nickname})`,
    );
  }
}
