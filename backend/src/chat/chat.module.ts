import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    ChatService,
    PrismaService,
    ChatGateway,
    JwtService,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
