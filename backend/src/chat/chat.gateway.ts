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
import { WsDataType } from './entities/chat.entity';

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

  @SubscribeMessage('msgFromClient')
  async handleMessage(
    @ConnectedSocket() client: any,
    @MessageBody() wsData: WsDataType,
  ) {
    const senderUser: User = client.user;
    this.id += 1;
    const wsRoomName = `<${senderUser.id}_${this.id}>`;

    if (wsData.type === 'DM') {
      const receiverUser = await this.prisma.user.findUnique({
        where: {
          id: wsData.receiverUserId,
        },
      });

      for (const client of this.connectedClients) {
        if (
          client.user.id === senderUser.id ||
          client.user.id === receiverUser.id
        ) {
          client.join(wsRoomName);
        }
      }

      const room = await this.prisma.room.findUnique({
        where: {
          name: this.chatService.generateDMRoomName(
            receiverUser.id,
            senderUser.id,
          ),
        },
      });

      if (!room) return;

      await this.prisma.message.create({
        data: {
          roomName: room.name,
          receiverUser: receiverUser.nickname,
          pictureURL: receiverUser.pictureURL,
          data: wsData.message,
        },
      });

      this.server.to(wsRoomName).emit(
        'msgFromServer',
        await this.chatService.getDmData(room, senderUser), // TODO: handle the case when this function throw an InternalServerErrorException
      );

      for (const client of this.connectedClients) {
        if (client.user.id === senderUser.id) {
          client.emit(
            'msgFromServer',
            await this.chatService.getDmData(room, receiverUser), // TODO: handle the case when this function throw an InternalServerErrorException
          );
        }
      }
    }

    if (wsData.type === 'CHANNEL') {
      const room = await this.prisma.room.findUnique({
        where: {
          id: wsData.channelId,
        },
      });

      const mutedEntry = await this.prisma.muted.findFirst({
        where: {
          roomName: room.name,
          receiverUser: senderUser.nickname,
        },
      });

      if (mutedEntry) {
        if (mutedEntry.time < moment().format('YYYY-MM-DD hh:mm:ss')) {
          this.chatService.unmuted(senderUser, room.name);
        } else {
          return;
        }
      }

      if (!room) return;

      for (const client of this.connectedClients) {
        if (room.members.includes(client.user.nickname)) {
          client.join(wsRoomName);
        }
      }

      await this.prisma.message.create({
        data: {
          roomName: room.name,
          receiverUser: senderUser.nickname,
          pictureURL: senderUser.pictureURL,
          data: wsData.message,
        },
      });

      this.server.to(wsRoomName).emit(
        'msgFromServer',
        await this.chatService.getChannelData(room, senderUser), // TODO: handle the case when this function throw an InternalServerErrorException
      );
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
