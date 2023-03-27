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
import { jwtConstants } from 'src/auth/constants';
// socket

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
}
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
})
export class GameGateway implements OnGatewayConnection {
  constructor(
    @Inject(GameService) private readonly gameService: GameService,
    private jwtService: JwtService,
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    if (!token) {
      client.disconnect();
      return;
    }

    // console.log(client.handshake.auth.token);
    const payload = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    payload.id = payload.sub;

    console.log('payload', payload.id);
    if (client.handshake.auth.context === 'game')
      console.log('user', client.id, 'is in game');
    else {
      if (!this.gameService.checkIfUserExists(payload.sub))
        console.log('user', client.id, 'is online');
      // this.gameService.addUserToDB(payload.sub);
    }
    // if
    // console.log(client.handshake.auth);

    // pass only {id, pictureURL, nickname}
    this.gameService.addUserToSocket(client, {
      id: payload.sub,
      pictureURL: payload.pictureURL,
      nickname: payload.nickname,
    });
    // check if user was already in UserToSocket array
    // if not make status online

    // client.ids = payload.id;
    // console.log(payload);
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    // console.log('QUERY', client.handshake.auth);
    console.log(`Client disconnected: ${client.id}`);

    const userId = this.gameService.removePlayer(client, this.server);

    // if user not anymore in UserToSocket array send to DB
    if (userId) {
      if (client.handshake.auth.context === 'game')
        console.log('user', client.id, 'is not in game anymore : online');
      // else {
      if (!this.gameService.checkIfUserExists(userId)) {
        console.log('user', client.id, 'is offline');
      }
      // this.gameService.removeUserFromDB(client.id);
      // }
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
