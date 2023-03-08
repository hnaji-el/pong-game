import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {SocketGateway} from './socket/socket.gateway'
@Module({
  imports: [],
  controllers: [AppController],
  providers: [SocketGateway, AppService],
})
export class AppModule {}
