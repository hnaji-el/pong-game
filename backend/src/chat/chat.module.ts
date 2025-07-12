import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    ChatService,
    PrismaService,
    UsersService,
    ChatGateway,
    JwtService,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
