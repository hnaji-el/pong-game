import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('test')
  @Redirect('https://youtube.com', 200)
  test() {
    console.log('hello youtube');
  }

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Req() req: Request) {
    return await this.usersService.getAllUsers(req.user);
  }

  @Patch('/users/update_nickname')
  @UseGuards(JwtAuthGuard)
  async updateNickname(@Req() req, @Body() body) {
    await this.usersService.updateNickname(req.user.id, body.nickname);
  }

  @Get('/users/:id')
  @UseGuards(JwtAuthGuard)
  async getOneUser(@Param('id') id: string) {
    return await this.usersService.getOneUser(id);
  }

  @Get('/users/friends/:id')
  @UseGuards(JwtAuthGuard)
  async getFriends(@Param('id') id: string) {
    return await this.usersService.getFriends(id);
  }

  @Post('/users/add-friend/:id')
  @UseGuards(JwtAuthGuard)
  async addFriend(@Req() req, @Param('id') id: string) {
    await this.usersService.addFriend(req.user, id);
  }

  @Delete('users/remove-friend/:id')
  @UseGuards(JwtAuthGuard)
  async removeFriend(@Req() req, @Param('id') id: string) {
    await this.usersService.removeFriend(req.user, id);
  }

  @Patch('users/block-user/:id')
  @UseGuards(JwtAuthGuard)
  async blockUser(@Req() req, @Param('id') id: string) {
    await this.usersService.blockUser(req.user, id);
  }

  @Patch('users/unblock-user/:id')
  @UseGuards(JwtAuthGuard)
  async unblockUser(@Req() req, @Param('id') id: string) {
    await this.usersService.unblockUser(req.user, id);
  }
}
