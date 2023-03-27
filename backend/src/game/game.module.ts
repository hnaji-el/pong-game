import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { GameController } from './game.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  imports: [JwtModule],
  controllers: [GameController],
  providers: [GameService, GameGateway, PrismaService],
})
export class GameModule {}
