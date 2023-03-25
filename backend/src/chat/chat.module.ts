import { Module } from '@nestjs/common';
import { RoomController } from './chat.controller';
import { RoomService } from './chat.service';
import { PrismaService } from "src/prisma/prisma.service";
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [RoomService, PrismaService, ChatGateway, JwtService, ConfigService],
  controllers: [RoomController]
})
export class RoomModule {}