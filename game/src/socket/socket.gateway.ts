import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server ,Socket } from 'socket.io';
import { GameService } from 'src/game/game.service';
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection{
  constructor(private readonly gameService: GameService){}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: any, message: any): void {
    console.log('Message received:', message);
  }
  @SubscribeMessage('queuing')
  handleQueuing(client: Socket): void {
    this.gameService.addToQueue(client);
  }
}
