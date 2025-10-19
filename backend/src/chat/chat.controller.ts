import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { ChannelType } from '@prisma/client';
import { Request } from 'express';
import { Message, RoomData, Rooms } from './entities/chat.entity';
import { GetRoomParamsDto, GetRoomQueryDto } from './dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/rooms')
  async getUserRooms(
    @Req() req: Request,
    @Query() query: GetRoomQueryDto,
  ): Promise<Rooms> {
    return this.chatService.getUserRooms(req.user.id, query.type);
  }

  @Get('/rooms/:roomId')
  async getOneRoom(
    @Req() req: Request,
    @Param() params: GetRoomParamsDto,
    @Query() query: GetRoomQueryDto,
  ): Promise<RoomData> {
    return this.chatService.getOneRoom(req.user.id, params.roomId, query.type);
  }

  @Get('/messages/:roomId')
  async getRoomMessages(
    @Req() req: Request,
    @Param() params: GetRoomParamsDto,
    @Query() query: GetRoomQueryDto,
  ): Promise<Message[]> {
    if (query.type === 'dm') {
      return this.chatService.getDmMessages(req.user.id, params.roomId);
    } else {
      return this.chatService.getChannelMessages(req.user.id, params.roomId);
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
