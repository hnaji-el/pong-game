import { Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { JwtService } from '@nestjs/jwt';
// socket

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
}
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
})
export class GameGateway implements OnGatewayConnection {
  constructor(
    @Inject(GameService) private readonly gameService: GameService,
    private jwtService: JwtService,
  ) {}

  // verify
  // decode
  // getUser
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    if (!token) {
      client.disconnect();
      return;
    }

    const payload = this.jwtService.verify(token, {
      secret: process.env.SECRET,
    });
    payload.id = payload.sub;
    console.log('payload', payload);
    if (payload) {
      if (!this.gameService.checkIfUserExists(payload.sub)) {
        console.log('user', payload.id, 'is online');
        if (payload.id !== undefined)
          this.gameService.updateUserStatus(payload.id, 'online');
      }
    }
    this.gameService.addUserToSocket(client, {
      id: payload.sub,
      pictureURL: payload.pictureURL,
      nickname: payload.nickname,
    });
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    const userId = this.gameService.removePlayer(client, this.server);
    if (userId) {
      if (!this.gameService.checkIfUserExists(userId)) {
        console.log('user', userId, 'is offline');
        this.gameService.updateUserStatus(userId, 'offline');
      }
    }
  }

  @SubscribeMessage('inviteToPlay')
  handleInviteToPlay(
    client: Socket,
    payload: { sender: TypeData; receiverId: string },
  ): void {
    console.log('BACKEND INVITING', payload.sender, payload.receiverId);
    this.gameService.inviteToPlay(
      client,
      payload.sender,
      payload.receiverId,
      this.server,
    );
  }
  @SubscribeMessage('watchGame')
  handleWatchGame(client: Socket, roomId: string): void {
    this.gameService.watchGame(client, roomId);
  }
  @SubscribeMessage('inviteAccepted')
  handleInviteAccepted(client: Socket, senderSocketId: any): void {
    console.log('invite accepted', senderSocketId.senderSocketId, client.id);
    this.server
      .to([senderSocketId.senderSocketId, client.id])
      .emit('navigateToGame');
    // this.gameService.inviteAccepted(client, senderSocketId, this.server);
  }

  @SubscribeMessage('queuing')
  handleQueuing(client: Socket, mode: string): void {
    this.gameService.addToQueue(client, this.server, mode);
  }
  @SubscribeMessage('startingGame')
  handleStartingGame(
    client: Socket,
    payload: {
      roomId: string;
      mode: string;
    },
  ): void {
    console.log('starting game in room ' + payload.roomId);

    this.gameService.startGame(payload.roomId, this.server, payload.mode);
  }

  @SubscribeMessage('keyDown')
  handleKeyDown(
    client: Socket,
    payload: { arrow: string; roomId: string; playerId: number },
  ): void {
    this.gameService.keyDown(
      client,
      payload.arrow,
      payload.roomId,
      payload.playerId,
    );
  }
}
