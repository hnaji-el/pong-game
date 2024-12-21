import { AttachedUserEntity } from '../../src/users/entities/attachedUser.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user: AttachedUserEntity;
  }
}
