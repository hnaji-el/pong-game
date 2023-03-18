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
  handleQueuing(client: Socket): void {
    this.gameService.addToQueue(client, this.server);
  }
  @SubscribeMessage('startingGame')
  handleStartingGame(server: Server, roomId: string): void {
    console.log('starting game in room ' + roomId);

    this.gameService.startGame(roomId, server);
  }
  // @SubscribeMessage('playerId')
  // handlePlayerId(client: Socket, playerId: number): void {
  //   this.gameService.setPlayerId(client, playerId);
  // }
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
