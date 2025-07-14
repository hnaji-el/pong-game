import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { ChannelType } from '@prisma/client';
import { Request } from 'express';
import { Message, Rooms } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/rooms')
  @UseGuards(JwtAuthGuard)
  async getUserRooms(
    @Req() req: Request,
    @Query('type') type: 'dm' | 'channel',
  ): Promise<Rooms> {
    return this.chatService.getUserRooms(req.user.id, type === 'dm');
  }

  @Get('/messages/:roomId')
  @UseGuards(JwtAuthGuard)
  async getRoomMessages(
    @Req() req: Request,
    @Param('roomId') roomId: string,
    @Query('type') type: 'dm' | 'channel',
  ): Promise<Message[]> {
    if (type === 'dm') {
      return this.chatService.getDmMessages(req.user.id, roomId);
    } else {
      return this.chatService.getChannelMessages(req.user.id, roomId);
    }
  }

  @Post('/channels')
  @UseGuards(JwtAuthGuard)
  async createChannel(
    @Req() req: Request,
    @Body() body: { name: string; type: ChannelType; password?: string },
  ): Promise<{ id: string }> {
    return this.chatService.createChannel(
      req.user.id,
      body.name,
      body.type,
      body.password,
    );
  }
}
