import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

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
}
