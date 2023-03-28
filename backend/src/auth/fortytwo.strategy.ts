import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, cb } from 'passport-42';
import { AuthService } from './auth.service';
import { fortyTwoConstants } from './constants';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: fortyTwoConstants.clientID,
      clientSecret: fortyTwoConstants.clientSecret,
      callbackURL: fortyTwoConstants.callbackURL,
      profileFields: {
        nickname: 'login',
        pictureURL: 'image.versions.medium',
      },
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: cb,
  ): Promise<any> {
    const user = await this.authService.validateUser(
      profile.nickname,
      profile._json.email,
      profile.pictureURL,
    );
    done(null, user);
  }
}
