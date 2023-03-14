import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import { INestApplication, WebSocketAdapter } from '@nestjs/common';

export class CustomWebSocketAdapter
  extends IoAdapter
  implements WebSocketAdapter
{
  constructor(app: INestApplication) {
    super(app);
  }

  createIOServer(port: number): Server {
    const server = super.createIOServer(port, {
      cors: {
        origin: 'http://localhost:3001', // Replace with your React app URL
        credentials: true,
      },
    });
    return server;
  }
}
