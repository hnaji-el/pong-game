import { Controller, Get, Param, Post } from '@nestjs/common';
import { UseGuards, Patch, Delete, Req } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('/channels/create-channel')
  @UseGuards(JwtAuthGuard)
  async createChannel(@Req() req: Request, @Body() channel) {
    await this.chatService.createRoom(
      channel.data.name,
      req.user.nickname,
      [],
      channel.data.type,
      channel.data.password,
    );
  }

  @Get('/dms/dms-messages')
  @UseGuards(JwtAuthGuard)
  async getDmsData(@Req() req: Request) {
    return await this.chatService.getDmsData(req.user);
  }

  @Get('/channels/channels-messages')
  @UseGuards(JwtAuthGuard)
  async getChannelsData(@Req() req: Request) {
    return await this.chatService.getChannelsData(req.user);
  }

  @Post('/join-room')
  @UseGuards(JwtAuthGuard)
  async joinRoom(@Req() req: Request, @Body() room) {
    try {
      if (room.data.type === 'PUBLIC') {
        return await this.chatService.joinRoom(req.user, room.data.name);
      } else if (room.data.type === 'PROTECTED') {
        return await this.chatService.joinProtectedRoom(req.user, room);
      }
    } catch {}
  }

  @Post('/channel/add-member')
  @UseGuards(JwtAuthGuard)
  async addMember(
    @Req() req: Request,
    @Body() data: { channelId: string; channelType: string; userId: string },
  ) {
    try {
      if (data.channelType === 'PUBLIC') await this.chatService.addMember(data);
      else await this.chatService.addToChannelNotPublic(req.user, data);
    } catch (error) {}
  }

  @Get('/channel/members/:channelId')
  @UseGuards(JwtAuthGuard)
  async getChannelMembers(
    @Req() req: Request,
    @Param('channelId') channelId: string,
  ) {
    return await this.chatService.getChannelMembers(req.user, channelId);
  }

  @Get('/channel/non-member-friends/:channelId')
  @UseGuards(JwtAuthGuard)
  async getNonMemberFriends(
    @Req() req: Request,
    @Param('channelId') channelId: string,
  ) {
    return await this.chatService.getNonMemberFriends(req.user, channelId);
  }

  @Post('/set-admin')
  @UseGuards(JwtAuthGuard)
  async setAdmin(
    @Req() req: Request,
    @Body() data: { channelId: string; memberId: string },
  ) {
    try {
      await this.chatService.setAdmin(req.user, data);
    } catch {}
  }

  @Patch('/block')
  @UseGuards(JwtAuthGuard)
  async blockMember(
    @Req() req: Request,
    @Body() data: { channelId: string; memberId: string },
  ) {
    await this.chatService.blockMember(req.user, data);
  }

  @Patch('/kick')
  @UseGuards(JwtAuthGuard)
  async kickMember(
    @Req() req: Request,
    @Body() data: { channelId: string; memberId: string },
  ) {
    await this.chatService.kickMember(req.user, data);
  }

  @Post('quite-room')
  @UseGuards(JwtAuthGuard)
  async quite_room(@Req() req: Request, @Body() rom) {
    return await this.chatService.quite_room(req.user, rom);
  }

  @Get('all-rooms')
  @UseGuards(JwtAuthGuard)
  async getallRooms(@Req() req: Request) {
    return await this.chatService.getAllRooms(req.user);
  }

  @Patch('/unblock-from-room')
  @UseGuards(JwtAuthGuard)
  async unblock(@Req() req: Request, @Body() room) {
    await this.chatService.unblockfromroom(req.user, room);
  }

  @Get('all-messages')
  @UseGuards(JwtAuthGuard)
  async getMessage(@Body() room) {
    return await this.chatService.getMessage(room.name);
  }

  @Get('DM')
  @UseGuards(JwtAuthGuard)
  async getDM(@Req() req: Request) {
    return await this.chatService.getDM('DM', req.user);
  }

  @Delete('delete-room/:name')
  @UseGuards(JwtAuthGuard)
  async DeleteRoom(@Req() req: Request, @Param() room) {
    return this.chatService.deleteroom(req.user, room);
  }
}
