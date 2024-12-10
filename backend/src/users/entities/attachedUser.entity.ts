import { User } from '@prisma/client';
import { RelationShip } from '@prisma/client';

export interface AttachedUserEntity extends User {
  requester: RelationShip[];
  addressee: RelationShip[];
}
