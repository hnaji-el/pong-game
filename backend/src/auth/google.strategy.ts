import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: process.env.CALLBACK_URL_GOOGLE,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // TODO: generate an elegante username & don't make it unique

    // const { given_name, family_name, email, picture } = profile._json;
    // const username = this.authService.getUsername(given_name, family_name);
    const { email, picture } = profile._json;
    const username = email.slice(0, email.indexOf('@'));

    const user = await this.authService.validateUser(username, email, picture);

    done(null, user);
  }
}
