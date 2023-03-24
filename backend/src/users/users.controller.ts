import {
  Body,
  Controller,
  Delete,
  Get,
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

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  async getAllUsers(@Req() req: Request) {
    return await this.usersService.getAllUsers(req.user);
  }

  @Get('/users/logged-user')
  @UseGuards(JwtAuthGuard)
  getLoggedUser(@Req() req) {
    return req.user;
  }

  @Patch('/users/update_nickname')
  @UseGuards(JwtAuthGuard)
  async updateNickname(@Req() req, @Body() body) {
    await this.usersService.updateNickname(req.user.id, body.nickname);
  }

  @Get('/users/:id')
  @UseGuards(JwtAuthGuard)
  async getOneUser(@Req() req, @Param('id') id: string) {
    return await this.usersService.getOneUser(req.user, id);
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

  @Patch('users/block-friend/:id')
  @UseGuards(JwtAuthGuard)
  async blockUser(@Req() req, @Param('id') id: string) {
    await this.usersService.blockUser(req.user, id);
  }

  @Patch('users/unblock-friend/:id')
  @UseGuards(JwtAuthGuard)
  async unblockUser(@Req() req, @Param('id') id: string) {
    await this.usersService.unblockUser(req.user, id);
  }
}
