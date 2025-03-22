import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from 'express';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    _nickname: string,
    _email: string,
    _pictureURL: string,
  ): Promise<any> {
    const user = await this.usersService.create(_nickname, _email, _pictureURL);
    return user;
  }

  generateJWT(user: any, state: boolean): string {
    const payload = {
      sub: user.id,
      nickname: user.nickname,
      isValid: state,
    };

    return this.jwtService.sign(payload);
  }

  login(req: any, res: Response) {
    if (!req.user.isTwoFactorAuthEnabled) {
      res.cookie('jwt', this.generateJWT(req.user, true));
    } else if (req.user.isTwoFactorAuthEnabled) {
      res.cookie('jwt', this.generateJWT(req.user, false));
    }

    if (req.user.isTwoFactorAuthEnabled) {
      res.redirect(`${process.env.FRONTEND_ORIGIN}/tfa`);
    } else if (req.user.firstTimeLogged) {
      res.redirect(`${process.env.FRONTEND_ORIGIN}/edit`);
    } else {
      res.redirect(`${process.env.FRONTEND_ORIGIN}/home`);
    }
  }

  getUsername(firstName: string, lastName: string): string {
    const username = (firstName.charAt(0) + lastName.split(' ').join('-'))
      .slice(0, 8)
      .toLowerCase();

    return username;
  }

  async generateTwoFactorAuthSecret(user: any) {
    const secret = authenticator.generateSecret();
    const otpauthURL = authenticator.keyuri(user.nickname, 'Pong-App', secret);
    await this.usersService.setTwoFactorAuthSecret(user.id, secret);
    return {
      secret: secret,
      otpauthURL: otpauthURL,
    };
  }

  async generateQR(otpauth: string): Promise<string> {
    return await qrcode.toDataURL(otpauth);
  }

  isTwoFactorAuthCodeValid(
    twoFactorAuthCode: string,
    twoFactorAuthSecret: string,
  ) {
    const isCodeValid = authenticator.verify({
      token: twoFactorAuthCode,
      secret: twoFactorAuthSecret,
    });
    return isCodeValid;
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('jwt');
    await this.usersService.setFirstTimeLoggedToFalse(req.user);
  }
}
