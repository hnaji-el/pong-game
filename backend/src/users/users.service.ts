import { ForbiddenException, Injectable } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { GameEntity } from './entities/game.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private chatService: ChatService) {}

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

  async create(_nickname: string, _pictureURL: string): Promise<any> {
    let user = await this.prisma.user.findUnique({
      where: { nickname: _nickname },
      include: { requester: true, addressee: true },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { nickname: _nickname, pictureURL: _pictureURL },
        include: { requester: true, addressee: true },
      });
    }
    return user;
  }

  // Game Services
  ////////////////////////////////////////////////////////////////
  async updateUserStatus(userId: string, status: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { status: status },
    });
  }

  async storeGame(
    winnerId: string,
    loserId: string,
    winScore: number,
    loseScore: number,
  ) {
    await this.prisma.game.create({
      data: {
        winnerId: winnerId,
        loserId: loserId,
        winScore: winScore,
        loseScore: loseScore,
      },
    });
  }
  ///////////////////////////////////////////////////////////////////////

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
      include: { requester: true, addressee: true },
    });
    if (!user) {
      throw new ForbiddenException();
    }

    const entity: UserEntity = {
      id: user.id,
      nickname: user.nickname,
      pictureURL: user.pictureURL,
      status: user.status,
      isFriendToLoggedUser: this.isFriend(loggedUser, user),
      isBlockedByLoggedUser: this.isBlocked(loggedUser, user),
      friendsNumber: this.getNumberOfFriends(user),
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
    const newPictureURL = `http://localhost:3000/users/profile-picture/${file.filename}`;

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

  async addFriend(requesterUser: any, addresseeUserId: string) {
    const addresseeUser = await this.prisma.user.findUnique({
      where: { id: addresseeUserId },
      include: { requester: true, addressee: true },
    });

    if (!addresseeUser) throw new ForbiddenException('user is not exit');
    if (this.isFriend(requesterUser, addresseeUser))
      throw new ForbiddenException('user already friend');
    if (this.isBlocked(requesterUser, addresseeUser))
      throw new ForbiddenException('user is blocked');

    await this.prisma.relationShip.create({
      data: {
        requesterId: requesterUser.id,
        addresseeId: addresseeUser.id,
        type: 'FRIENDSHIP',
      },
    });
    await this.chatService.CreateRoom(requesterUser.nickname,addresseeUser.nickname + requesterUser.nickname, "personnel");
    await this.chatService.joinroom(addresseeUser,addresseeUser.nickname + requesterUser.nickname);

  }

  async removeFriend(requesterUser: any, addresseeUserId: string) {
    const addresseeUser = await this.prisma.user.findUnique({
      where: { id: addresseeUserId },
      include: { requester: true, addressee: true },
    });

    if (!addresseeUser) throw new ForbiddenException('user is not exit');
    if (this.isBlocked(requesterUser, addresseeUser))
      throw new ForbiddenException('user is blocked');
    if (!this.isFriend(requesterUser, addresseeUser))
      throw new ForbiddenException('user without any relationship');

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

  isFriend(user1: any, user2: any): boolean {
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

  isBlocked(user1: any, user2: any): boolean {
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
