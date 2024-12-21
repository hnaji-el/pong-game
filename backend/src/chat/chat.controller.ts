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

  @Post('/add-to-room')
  @UseGuards(JwtAuthGuard)
  async addtoroom(@Req() req: Request, @Body() room) {
    try {
      if (room.data.type === 'PUBLIC')
        await this.chatService.addtoroom(req.user, room);
      else await this.chatService.addtoroomNopublic(req.user, room);
    } catch (error) {}
  }

  @Get('/friends-in-room/:name')
  @UseGuards(JwtAuthGuard)
  async getfriendNotjoinRoom(@Req() req: Request, @Param('name') name: string) {
    return await this.chatService.getfriendNotjoinRoom(req.user, name);
  }

  @Get('/users-in-room/:name')
  @UseGuards(JwtAuthGuard)
  async getallUserinRoom(@Req() req: Request, @Param('name') name: string) {
    return await this.chatService.getallUsersinRoom(req.user, name);
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

  @Post('/set-admin')
  @UseGuards(JwtAuthGuard)
  async setuseradmins(@Req() req: Request, @Body() room) {
    try {
      await this.chatService.adduseradmins(req.user, room);
    } catch (error) {}
  }

  @Patch('/ban')
  @UseGuards(JwtAuthGuard)
  async banmember(@Req() req: Request, @Body() room) {
    await this.chatService.banmember(req.user, room);
  }

  @Patch('/kick')
  @UseGuards(JwtAuthGuard)
  async kickmember(@Req() req: Request, @Body() room) {
    await this.chatService.quickmember(req.user, room);
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

  @Patch('muted')
  @UseGuards(JwtAuthGuard)
  async muteduser(@Req() req: Request, @Body() room) {
    return await this.chatService.muted(req.user, room);
  }

  @Patch('unmuted')
  @UseGuards(JwtAuthGuard)
  async unmuteduser(@Req() req: Request, @Body() room) {
    return await this.chatService.unmuted(req.user, room);
  }

  @Delete('delete-room/:name')
  @UseGuards(JwtAuthGuard)
  async DeleteRoom(@Req() req: Request, @Param() room) {
    return this.chatService.deleteroom(req.user, room);
  }
}
