import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { FortyTwoAuthGuard } from './fortytwo-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  private isRegister = true;
  constructor(private authService: AuthService) {}

  @Get('auth/login')
  @UseGuards(FortyTwoAuthGuard)
  login() {
    return;
  }

  @Get('/auth/login/callback')
  @UseGuards(FortyTwoAuthGuard)
  loginRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('jwt', this.authService.generateJWT(req.user));

    return this.isRegister === true
      ? { firstLogin: true }
      : { firstLogin: false };
  }

  @Get('auth/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    this.isRegister = false;
  }
}
