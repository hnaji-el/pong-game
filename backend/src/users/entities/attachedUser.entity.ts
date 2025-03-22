import { User } from '@prisma/client';
import { Relationship } from '@prisma/client';

export interface AttachedUserEntity extends User {
  requester: Relationship[];
  addressee: Relationship[];
}
