import { Controller, Get, Param, Post } from '@nestjs/common';
import { UseGuards, Patch, Delete, Req } from '@nestjs/common';
import { Body, UseFilters } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { ForbiddenException } from '@nestjs/common';
import { HttpExceptionFilter } from './chat.exception';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Post('create-room')
  async CreateRoom(@Req() req, @Body() room) {
    const user = req.user;
    try {
      if (room.data.type === 'public' || room.data.type === 'private')
        await this.chatService.CreateRoom(
          user.nickname,
          room.data.name,
          room.data.type,
        );
      else
        await this.chatService.CreateRoomprotected(
          user.nickname,
          room.data.name,
          room.data.type,
          room.data.password,
        );
    } catch (error) {
      throw new ForbiddenException('name existe');
    }
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Post('/join-room')
  async joinroom(@Req() req, @Body() room) {
    try {
      const user = req.user;
      if (room.data.type === 'public')
        return await this.chatService.joinroom(user, room.data.name);
      else if (room.data.type === 'protected')
        return await this.chatService.joinroomprotected(user, room);
    } catch (error) {}
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Post('/add-to-room')
  async addtoroom(@Req() req, @Body() room) {
    try {
      const user = req.user;
      if (room.data.type === 'public')
        await this.chatService.addtoroom(user, room);
      else await this.chatService.addtoroomNopublic(user, room);
    } catch (error) {}
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Get('/friends-in-room/:name')
  async getfriendNotjoinRoom(@Req() req, @Param('name') name: string) {
    const user = req.user;
    return await this.chatService.getfriendNotjoinRoom(user, name);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Get('/users-in-room/:name')
  async getallUserinRoom(@Req() req, @Param('name') name: string) {
    const user = req.user;
    return await this.chatService.getallUsersinRoom(user, name);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Post('quite-room')
  async quite_room(@Req() req, @Body() rom) {
    const user = req.user;
    return await this.chatService.quite_room(user, rom);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Get('all-rooms')
  async getallRooms(@Req() req) {
    const user = req.user;
    return await this.chatService.getAllRooms(user);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Post('/set-admin')
  async setuseradmins(@Req() req, @Body() room) {
    try {
      const user = req.user;
      await this.chatService.adduseradmins(user, room);
    } catch (error) {}
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Patch('/ban')
  async banmember(@Req() req, @Body() room) {
    const user = req.user;
    await this.chatService.banmember(user, room);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Patch('/kick')
  async kickmember(@Req() req, @Body() room) {
    const user = req.user;
    await this.chatService.quickmember(user, room);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Patch('/unblock-from-room')
  async unblock(@Req() req, @Body() room) {
    const user = req.user;
    await this.chatService.unblockfromroom(user, room);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Get('all-messages')
  async getMessage(@Body() room) {
    return await this.chatService.getMessage(room.name);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Get('DM')
  async getDM(@Req() req) {
    const user = req.user;
    return await this.chatService.getDM('personnel', user);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Get('DM-with-all-users')
  async getDMWithAllUsers(@Req() req) {
    const user = req.user;
    return await this.chatService.getDMWithAllUsers('personnel', user);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Get('room-message')
  async getRM(@Req() req) {
    const user = req.user;
    return await this.chatService.getRM(user);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Patch('muted')
  async muteduser(@Req() req, @Body() room) {
    const user = req.user;
    return await this.chatService.muted(user, room);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Patch('unmuted')
  async unmuteduser(@Req() req, @Body() room) {
    const user = req.user;
    return await this.chatService.unmuted(user, room);
  }

  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @Delete('delete-room/:name')
  async DeleteRoom(@Req() req, @Param() room) {
    const user = req.user;
    return this.chatService.deleteroom(user, room);
  }
}
