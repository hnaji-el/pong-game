import { Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '../game/game.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection {
  constructor(@Inject(GameService) private readonly gameService: GameService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: any, message: any): void {
    console.log('Message received:', message);
  }

  @SubscribeMessage('queuing')
  handleQueuing(client: Socket, mode: string): void {
    this.gameService.addToQueue(client, this.server, mode);
  }
  // handleStartingGame(server: Server, roomId: string, mode: string): void {
  @SubscribeMessage('startingGame')
  handleStartingGame(
    server: Server,
    { roomId, mode }: { roomId: string; mode: string },
  ): void {
    console.log('starting game in room ' + roomId + ' with mode ' + mode);
    this.gameService.startGame(roomId, server, mode);
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
