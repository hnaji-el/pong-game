import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { GameController } from './game.controller';
@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, GameGateway],
})
export class GameModule {}