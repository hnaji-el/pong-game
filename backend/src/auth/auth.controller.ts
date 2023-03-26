import {
  ClassSerializerInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Post, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { UseFilters, UseGuards, Controller, Body } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './fortytwo-auth.guard';
import { HttpExceptionFilter } from './http-exception.filter';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtTwoFactorGuard } from './jwt-two-factor.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // OAuth
  @Get('auth/login')
  @UseGuards(FortyTwoAuthGuard)
  login() {
    return;
  }

  @Get('auth/login/callback')
  @UseGuards(FortyTwoAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  loginRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    this.authService.loginRedirect(req, res);
  }

  @Get('auth/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req, res);
  }

  // 2FA
  @Post('2fa/generate')
  @UseGuards(JwtAuthGuard)
  async register(@Req() req: any, @Res() res: Response) {
    const { otpauthURL } = await this.authService.generateTwoFactorAuthSecret(
      req.user,
    );
    return this.authService.pipeQrCodeStream(res, otpauthURL);
  }

  @Post('2fa/verification')
  @UseGuards(JwtAuthGuard)
  async twoFactorAuthCodeVerification(
    @Req() req,
    @Body('2fa/twoFactorAuthCode') twoFactorAuthCode,
  ) {
    const isCodeValid = this.authService.isTwoFactorAuthCodeValid(
      twoFactorAuthCode,
      req.user.twoFactorAuthSecret,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.updateIsTwoFactorAuthValidated(req.user.id, true);
  }

  @Post('2fa/turn-on')
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(@Req() req) {
    if (req.user.isTwoFactorAuthValidated) {
      await this.usersService.updateIsTwoFactorAuthEnabled(req.user.id, true);
      await this.usersService.updateIsTwoFactorAuthValidated(
        req.user.id,
        false,
      );
    }
  }

  @Post('2fa/turn-off')
  @UseGuards(JwtAuthGuard)
  async turnOffTwoFactorAuthentication(@Req() req) {
    if (req.user.isTwoFactorAuthValidated) {
      await this.usersService.updateIsTwoFactorAuthEnabled(req.user.id, false);
      await this.usersService.updateIsTwoFactorAuthValidated(
        req.user.id,
        false,
      );
    }
  }

  @Post('2fa/authenticate')
  @UseGuards(JwtTwoFactorGuard)
  async authenticate(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body('twoFactorAuthCode') twoFactorAuthCode,
  ) {
    const isCodeValid = this.authService.isTwoFactorAuthCodeValid(
      twoFactorAuthCode,
      req.user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    res.cookie('jwt', this.authService.generateJWT(req.user, true));
  }
}
