import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server ,Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: any, message: any): void {
    console.log('Message received:', message);
  }
}
