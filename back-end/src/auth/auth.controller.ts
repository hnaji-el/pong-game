import { Controller, Get, Req, Res } from '@nestjs/common';
import { UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './fortytwo-auth.guard';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('auth/login')
  @UseGuards(FortyTwoAuthGuard)
  login() {
    return;
  }

  @Get('/auth/login/callback')
  @UseGuards(FortyTwoAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  loginRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    this.authService.loginRedirect(req, res);
  }

  @Get('auth/logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req, res);
  }
}
