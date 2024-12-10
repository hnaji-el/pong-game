import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { GameEntity } from './entities/game.entity';
import { AttachedUserEntity } from './entities/attachedUser.entity';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private chatService: ChatService,
  ) {}

  async create(nickname: string, email: string, pictureURL: string) {
    let user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { requester: true, addressee: true },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { nickname: nickname, email: email, pictureURL: pictureURL },
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
        pictureURL: loser.pictureURL,
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
        pictureURL: winner.pictureURL,
        score: `${x.winScore}-${x.loseScore}`,
        gameState: 'LOSE',
        winsNumber: user.winGames.length,
        losesNumber: user.loseGames.length,
      });
    }
    return entities;
  }

  async getAchievement(userId: any): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { winGames: true },
    });
    return user.winGames.length >= 4 ? true : false;
  }

  async getAllUsers(loggedUser: any): Promise<UserEntity[]> {
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
        pictureURL: user.pictureURL,
        status: user.status,
        isFriendToLoggedUser: this.isFriend(loggedUser, user),
        isBlockedByLoggedUser: this.isBlocked(loggedUser, user),
        friendsNumber: this.getNumberOfFriends(user),
      });
    }
    return entities;
  }

  async getOneUser(loggedUser: any, userId: string): Promise<UserEntity> {
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
      pictureURL: user.pictureURL,
      status: user.status,
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

  async updateUserPictureURL(user: any, file: Express.Multer.File) {
    const newPictureURL = `${process.env.BACKEND_ORIGIN}/users/profile-picture/${file.filename}`;

    await this.prisma.user.update({
      where: { id: user.id },
      data: { pictureURL: newPictureURL },
    });

    return { pictureURL: newPictureURL };
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
        throw new ForbiddenException('The user does not exit');
      }
      if (this.isFriend(requesterUser, addresseeUser)) {
        throw new ForbiddenException('The user is already a friend');
      }
      if (this.isBlocked(requesterUser, addresseeUser)) {
        throw new ForbiddenException('The user is already on the blocked list');
      }

      await this.prisma.relationShip.create({
        data: {
          requesterId: requesterUser.id,
          addresseeId: addresseeUser.id,
          type: 'FRIENDSHIP',
        },
      });

      await this.chatService.createRoom(
        this.chatService.generateDMRoomName(requesterUser.id, addresseeUser.id),
        requesterUser.nickname,
        [addresseeUser.nickname],
        'DIRECTMESSAGE',
      );
    } catch (error) {
      if (
        error instanceof ForbiddenException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      // handle database connection error or other unexpected error
      console.error(
        'Database connection error or other unexpected error:',
        error.stack,
      );

      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again later',
      );
    }
  }

  async removeFriend(requesterUser: any, addresseeUserId: string) {
    const addresseeUser = await this.prisma.user.findUnique({
      where: { id: addresseeUserId },
      include: { requester: true, addressee: true },
    });

    if (!addresseeUser) throw new ForbiddenException('User does not exit');
    if (this.isBlocked(requesterUser, addresseeUser))
      throw new ForbiddenException('User is blocked');
    if (!this.isFriend(requesterUser, addresseeUser))
      throw new ForbiddenException('User without any relationship');

    await this.prisma.relationShip.deleteMany({
      where: {
        OR: [
          { requesterId: requesterUser.id, addresseeId: addresseeUser.id },
          { requesterId: addresseeUser.id, addresseeId: requesterUser.id },
        ],
      },
    });
  }

  async blockUser(requesterUser: any, addresseeUserId: string) {
    const addresseeUser = await this.prisma.user.findUnique({
      where: { id: addresseeUserId },
      include: { requester: true, addressee: true },
    });

    if (!addresseeUser) throw new ForbiddenException('user is not exit');
    if (this.isBlocked(requesterUser, addresseeUser))
      throw new ForbiddenException('user already blocked');

    await this.prisma.relationShip.deleteMany({
      where: {
        OR: [
          { requesterId: requesterUser.id, addresseeId: addresseeUser.id },
          { requesterId: addresseeUser.id, addresseeId: requesterUser.id },
        ],
      },
    });
    await this.prisma.relationShip.create({
      data: {
        requesterId: requesterUser.id,
        addresseeId: addresseeUser.id,
        type: 'BLOCK',
      },
    });
  }

  async unblockUser(requesterUser: any, addresseeUserId: string) {
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
      await this.prisma.relationShip.deleteMany({
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

  async setFirstTimeLoggedToFalse(user: any) {
    if (user.firstTimeLogged) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { firstTimeLogged: false },
      });
    }
  }

  pushToEntities(entities: UserEntity[], user: any, FriendsNumber: number) {
    entities.push({
      id: user.id,
      nickname: user.nickname,
      pictureURL: user.pictureURL,
      status: user.status,
      friendsNumber: FriendsNumber,
    });
  }

  isLoggedUserBlockedByUser(loggedUser: any, user: any): boolean {
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

  getNumberOfFriends(user: any): number {
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
