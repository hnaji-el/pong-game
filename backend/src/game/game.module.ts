import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { GameController } from './game.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule],
  controllers: [GameController],
  providers: [GameService, GameGateway],
})
export class GameModule {}
