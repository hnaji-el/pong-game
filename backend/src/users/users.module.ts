import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from 'src/chat/chat.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, PrismaService, ChatService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
