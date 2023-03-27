import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(_nickname: string, _pictureURL: string): Promise<any> {
    const user = await this.usersService.create(_nickname, _pictureURL);
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

  loginRedirect(req: any, res: Response) {
    if (!req.user.isTwoFactorAuthEnabled) {
      res.cookie('jwt', this.generateJWT(req.user, true));
    } else if (req.user.isTwoFactorAuthEnabled) {
      res.cookie('jwt', this.generateJWT(req.user, false));
    }

    if (req.user.isTwoFactorAuthEnabled) {
      res.redirect('http://localhost:3001/tfa');
    } else if (req.user.firstTimeLogged) {
      res.redirect('http://localhost:3001/edit');
    } else {
      res.redirect('http://localhost:3001/');
    }
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

  async logout(req: any, res: Response) {
    res.clearCookie('jwt');
    await this.usersService.setFirstTimeLoggedToFalse(req.user);
  }
}
