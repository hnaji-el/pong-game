import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    ChatService,
    PrismaService,
    ChatGateway,
    JwtService,
    ConfigService,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
