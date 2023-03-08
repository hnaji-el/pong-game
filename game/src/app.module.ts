import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import {SocketGateway} from './socket/socket.gateway'
import { GameService } from './game/game.service';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [SocketGateway, AppService, GameService],
})
export class AppModule {}
