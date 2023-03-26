import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../auth/constants';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtTwoFactor extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtTwoFactor.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { requester: true, addressee: true },
    });
    if (!user || payload.isValid) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'jwt' in req.cookies) {
      return req.cookies.jwt;
    }
    return null;
  }
}
