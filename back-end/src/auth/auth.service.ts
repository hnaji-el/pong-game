import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

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

  generateJWT(user: any): string {
    const payload = {
      sub: user.id,
      nickname: user.nickname,
      pictureURL: user.pictureURL,
    };
    return this.jwtService.sign(payload);
  }

  loginRedirect(req: any, res: Response) {
    res.cookie('jwt', this.generateJWT(req.user));
    if (req.user.firstTimeLogged) res.redirect('http://localhost:3001/edit');
    else res.redirect('http://localhost:3001/');
  }

  async logout(req: any, res: Response) {
    res.clearCookie('jwt');
    await this.usersService.setFirstTimeLoggedToFalse(req.user);
  }
}
