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

  @Post('/channel/join-channel')
  @UseGuards(JwtAuthGuard)
  async joinChannel(
    @Req() req: Request,
    @Body() data: { id: string; type: string; password?: string },
  ) {
    if (data.type === 'PUBLIC') {
      return await this.chatService.joinChannel(req.user, data.id);
    } else if (data.type === 'PROTECTED') {
      return await this.chatService.joinProtectedChannel(req.user, data);
    }
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
  async getChannelNonMemberFriends(
    @Req() req: Request,
    @Param('channelId') channelId: string,
  ) {
    return await this.chatService.getChannelNonMemberFriends(
      req.user,
      channelId,
    );
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

  @Post('/channel/set-admin')
  @UseGuards(JwtAuthGuard)
  async setAdmin(
    @Req() req: Request,
    @Body() data: { channelId: string; memberId: string },
  ) {
    try {
      await this.chatService.setAdmin(req.user, data);
    } catch {}
  }

  @Patch('/channel/block-member')
  @UseGuards(JwtAuthGuard)
  async blockMember(
    @Req() req: Request,
    @Body() data: { channelId: string; memberId: string },
  ) {
    await this.chatService.blockMember(req.user, data);
  }

  @Patch('/channel/unblock-member')
  @UseGuards(JwtAuthGuard)
  async unblockMember(
    @Req() req: Request,
    @Body() data: { channelId: string; memberId: string },
  ) {
    await this.chatService.unblockMember(req.user, data);
  }

  @Patch('/channel/kick-member')
  @UseGuards(JwtAuthGuard)
  async kickMember(
    @Req() req: Request,
    @Body() data: { channelId: string; memberId: string },
  ) {
    await this.chatService.kickMember(req.user, data);
  }

  @Post('/channel/leave-channel')
  @UseGuards(JwtAuthGuard)
  async leaveChannel(@Req() req: Request, @Body() rom) {
    return await this.chatService.leaveChannel(req.user, rom);
  }

  @Delete('/channel/delete-room/:name')
  @UseGuards(JwtAuthGuard)
  async deleteChannel(@Req() req: Request, @Param() room) {
    return this.chatService.deleteChannel(req.user, room);
  }
}
