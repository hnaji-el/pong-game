import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { GameEntity } from './entities/game.entity';
import { AttachedUserEntity } from './entities/attachedUser.entity';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private chatService: ChatService,
  ) {}

  async create(nickname: string, email: string, pictureUrl: string) {
    let user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { requester: true, addressee: true },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { nickname: nickname, email: email, pictureUrl: pictureUrl },
        include: { requester: true, addressee: true },
      });
    }

    return user;
  }

  async setTwoFactorAuthSecret(userId: string, secret: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorAuthSecret: secret },
    });
  }

  async updateIsTwoFactorAuthValidated(userId: string, state: boolean) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isTwoFactorAuthValidated: state },
    });
  }

  async updateIsTwoFactorAuthEnabled(userId: string, state: boolean) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isTwoFactorAuthEnabled: state },
    });
  }

  async isFriends(userId1: string, userId2: string): Promise<boolean> {
    const count = await this.prisma.relationship.count({
      where: {
        OR: [
          { requesterId: userId1, addresseeId: userId2, type: 'FRIENDSHIP' },
          { requesterId: userId2, addresseeId: userId1, type: 'FRIENDSHIP' },
        ],
      },
    });

    return count > 0;
  }

  async getMatchHistory(userId: string): Promise<GameEntity[]> {
    const entities: GameEntity[] = [];
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { winGames: true, loseGames: true },
    });

    for (const x of user.winGames) {
      const loser = await this.prisma.user.findUnique({
        where: { id: x.loserId },
      });
      entities.push({
        id: loser.id,
        nickname: loser.nickname,
        pictureURL: loser.pictureUrl,
        score: `${x.loseScore}-${x.winScore}`,
        gameState: 'WIN',
        winsNumber: user.winGames.length,
        losesNumber: user.loseGames.length,
      });
    }
    for (const x of user.loseGames) {
      const winner = await this.prisma.user.findUnique({
        where: { id: x.winnerId },
      });
      entities.push({
        id: winner.id,
        nickname: winner.nickname,
        pictureURL: winner.pictureUrl,
        score: `${x.winScore}-${x.loseScore}`,
        gameState: 'LOSE',
        winsNumber: user.winGames.length,
        losesNumber: user.loseGames.length,
      });
    }
    return entities;
  }

  async getAchievement(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { winGames: true },
    });
    return user.winGames.length >= 4 ? true : false;
  }

  async getAllUsers(loggedUser: AttachedUserEntity): Promise<UserEntity[]> {
    const entities: UserEntity[] = [];
    const users = await this.prisma.user.findMany({
      where: { NOT: { id: loggedUser.id } },
      include: { requester: true, addressee: true },
    });

    for (const user of users) {
      if (this.isLoggedUserBlockedByUser(loggedUser, user)) continue;
      entities.push({
        id: user.id,
        nickname: user.nickname,
        pictureURL: user.pictureUrl,
        status: user.isOnline ? 'online' : 'offline',
        isFriendToLoggedUser: this.isFriend(loggedUser, user),
        isBlockedByLoggedUser: this.isBlocked(loggedUser, user),
        friendsNumber: this.getNumberOfFriends(user),
      });
    }
    return entities;
  }

  async getOneUser(
    loggedUser: AttachedUserEntity,
    userId: string,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        requester: true,
        addressee: true,
        winGames: true,
        loseGames: true,
      },
    });
    if (!user) {
      throw new ForbiddenException();
    }

    const entity: UserEntity = {
      id: user.id,
      nickname: user.nickname,
      pictureURL: user.pictureUrl,
      status: user.isOnline ? 'online' : 'offline',
      friendsNumber: this.getNumberOfFriends(user),
      winsNumber: user.winGames.length,
      losesNumber: user.loseGames.length,
      isFriendToLoggedUser: this.isFriend(loggedUser, user),
      isBlockedByLoggedUser: this.isBlocked(loggedUser, user),
      is_2FA_Enabled: user.isTwoFactorAuthEnabled,
    };
    return entity;
  }

  async updateNickname(userId: string, _nickname: string) {
    if (!(_nickname && _nickname.length <= 20)) {
      throw new ForbiddenException();
    }
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { nickname: _nickname },
      });
    } catch (e) {
      throw new ForbiddenException();
    }
  }

  async updateUserPictureURL(
    user: AttachedUserEntity,
    file: Express.Multer.File,
  ) {
    const newPictureUrl = `${process.env.BACKEND_ORIGIN}/users/profile-picture/${file.filename}`;

    await this.prisma.user.update({
      where: { id: user.id },
      data: { pictureUrl: newPictureUrl },
    });

    return { pictureURL: newPictureUrl };
  }

  async getFriends(userId: string): Promise<UserEntity[]> {
    const entities: UserEntity[] = [];
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { requester: true, addressee: true },
    });

    if (!user) throw new ForbiddenException();
    const FriendsNumber = this.getNumberOfFriends(user);

    for (const x of user.requester) {
      if (x.type !== 'FRIENDSHIP') continue;
      const user = await this.prisma.user.findUnique({
        where: { id: x.addresseeId },
      });
      this.pushToEntities(entities, user, FriendsNumber);
    }

    for (const x of user.addressee) {
      if (x.type !== 'FRIENDSHIP') continue;
      const user = await this.prisma.user.findUnique({
        where: { id: x.requesterId },
      });
      this.pushToEntities(entities, user, FriendsNumber);
    }

    return entities;
  }

  async addFriend(requesterUser: AttachedUserEntity, addresseeUserId: string) {
    try {
      const addresseeUser = await this.prisma.user.findUnique({
        where: { id: addresseeUserId },
        include: { requester: true, addressee: true },
      });

      if (!addresseeUser) {
        throw new NotFoundException('User not found');
      }
      if (requesterUser.id === addresseeUser.id) {
        throw new ConflictException(
          'You cannot send a friend request to yourself',
        );
      }
      if (this.isFriend(requesterUser, addresseeUser)) {
        throw new ConflictException('Users are already friends');
      }
      if (this.isBlocked(requesterUser, addresseeUser)) {
        throw new ForbiddenException('User is already on the blocked list');
      }

      await this.prisma.relationship.create({
        data: {
          requesterId: requesterUser.id,
          addresseeId: addresseeUser.id,
          type: 'FRIENDSHIP',
        },
      });

      await this.chatService.createDM(requesterUser.id, addresseeUser.id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof ForbiddenException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      console.error(
        'Database connection error or other unexpected error:',
        error.stack,
      );

      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later',
      );
    }
  }

  async removeFriend(
    requesterUser: AttachedUserEntity,
    addresseeUserId: string,
  ) {
    const addresseeUser = await this.prisma.user.findUnique({
      where: { id: addresseeUserId },
      include: { requester: true, addressee: true },
    });

    if (!addresseeUser) throw new ForbiddenException('User does not exit');
    if (this.isBlocked(requesterUser, addresseeUser))
      throw new ForbiddenException('User is blocked');
    if (!this.isFriend(requesterUser, addresseeUser))
      throw new ForbiddenException('User without any relationship');

    await this.prisma.relationship.deleteMany({
      where: {
        OR: [
          { requesterId: requesterUser.id, addresseeId: addresseeUser.id },
          { requesterId: addresseeUser.id, addresseeId: requesterUser.id },
        ],
      },
    });
  }

  async blockFriend(
    requesterUser: AttachedUserEntity,
    addresseeUserId: string,
  ) {
    const addresseeUser = await this.prisma.user.findUnique({
      where: { id: addresseeUserId },
      include: { requester: true, addressee: true },
    });

    if (!addresseeUser) throw new ForbiddenException('user is not exit');
    if (this.isBlocked(requesterUser, addresseeUser))
      throw new ForbiddenException('user already blocked');

    await this.prisma.relationship.deleteMany({
      where: {
        OR: [
          { requesterId: requesterUser.id, addresseeId: addresseeUser.id },
          { requesterId: addresseeUser.id, addresseeId: requesterUser.id },
        ],
      },
    });

    await this.prisma.relationship.create({
      data: {
        requesterId: requesterUser.id,
        addresseeId: addresseeUser.id,
        type: 'BLOCK',
      },
    });
  }

  async unblockUser(
    requesterUser: AttachedUserEntity,
    addresseeUserId: string,
  ) {
    const addresseeUser = await this.prisma.user.findUnique({
      where: { id: addresseeUserId },
      include: { requester: true, addressee: true },
    });

    if (!addresseeUser) throw new ForbiddenException('user is not exit');
    if (this.isFriend(requesterUser, addresseeUser))
      throw new ForbiddenException('user already friend');
    if (!this.isBlocked(requesterUser, addresseeUser))
      throw new ForbiddenException('user is not blocked');
    if (this.isBlocked(requesterUser, addresseeUser)) {
      await this.prisma.relationship.deleteMany({
        where: {
          OR: [
            { requesterId: requesterUser.id, addresseeId: addresseeUser.id },
            { requesterId: addresseeUser.id, addresseeId: requesterUser.id },
          ],
        },
      });
    }
  }

  // HELPER METHODS

  async setFirstTimeLoggedToFalse(user: AttachedUserEntity) {
    if (user.firstTimeLogged) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { firstTimeLogged: false },
      });
    }
  }

  pushToEntities(entities: UserEntity[], user: User, FriendsNumber: number) {
    entities.push({
      id: user.id,
      nickname: user.nickname,
      pictureURL: user.pictureUrl,
      status: user.isOnline ? 'online' : 'offline',
      friendsNumber: FriendsNumber,
    });
  }

  isLoggedUserBlockedByUser(
    loggedUser: AttachedUserEntity,
    user: AttachedUserEntity,
  ): boolean {
    const addressee = loggedUser.addressee;

    for (const x of addressee) {
      if (x.requesterId === user.id && x.type === 'BLOCK') return true;
    }

    return false;
  }

  isFriend(user1: AttachedUserEntity, user2: AttachedUserEntity) {
    for (const elem of user1.requester) {
      if (elem.addresseeId === user2.id && elem.type === 'FRIENDSHIP') {
        return true;
      }
    }

    for (const elem of user1.addressee) {
      if (elem.requesterId === user2.id && elem.type === 'FRIENDSHIP') {
        return true;
      }
    }

    return false;
  }

  isBlocked(user1: AttachedUserEntity, user2: AttachedUserEntity) {
    for (const elem of user1.requester) {
      if (elem.addresseeId === user2.id && elem.type === 'BLOCK') {
        return true;
      }
    }

    for (const elem of user1.addressee) {
      if (elem.requesterId === user2.id && elem.type === 'BLOCK') {
        return true;
      }
    }

    return false;
  }

  getNumberOfFriends(user: AttachedUserEntity): number {
    let count = 0;

    for (const elem of user.requester) {
      if (elem.type === 'FRIENDSHIP') count++;
    }
    for (const elem of user.addressee) {
      if (elem.type === 'FRIENDSHIP') count++;
    }
    return count;
  }
}
