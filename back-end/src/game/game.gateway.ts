import { Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
})
export class GameGateway implements OnGatewayConnection {
  constructor(@Inject(GameService) private readonly gameService: GameService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.gameService.removePlayer(client, this.server);
  }

  @SubscribeMessage('watchGame')
  handleWatchGame(client: Socket, roomId: string): void {
    this.gameService.watchGame(client, roomId);
  }
  @SubscribeMessage('sendMessage')
  handleSendMessage(client: any, message: any): void {
    console.log('Message received:', message);
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
