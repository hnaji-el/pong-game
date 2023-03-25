import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { Patch, Post, Req, Res } from '@nestjs/common';
import { UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { PictureValidatorPipe } from './picture-validator.pipe';

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

  @Post('/users/upload-profile-picture')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './src/users/profilePictures');
        },
        filename: (req, file, cb) => {
          const uniquePictureName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const words = file.originalname.split('.');
          const fileExtention = words[words.length - 1];
          cb(null, `${uniquePictureName}.${fileExtention}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
          return cb(null, false);
        cb(null, true);
      },
      limits: { fileSize: 1000000, files: 1 },
    }),
  )
  async uploadPictureAndPassValidation(
    @Req() req,
    @UploadedFile(new PictureValidatorPipe()) file: Express.Multer.File,
  ) {
    return await this.usersService.updateUserPictureURL(req.user, file);
  }

  @Get('/users/profile-picture/:filename')
  @UseGuards(JwtAuthGuard)
  async getProfilePicture(@Res() res, @Param('filename') filename) {
    res.sendFile(filename, { root: './src/users/profilePictures/' });
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
