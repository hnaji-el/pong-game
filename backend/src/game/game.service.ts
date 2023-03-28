import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { GameState, Player, Ball } from 'shared/types';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
// import { SocketGateway } from '../socket/socket.gateway';

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
}
interface UserToSocket {
  socket: Socket;
  user: {
    id: string;
    nickname: string;
  };
}
@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}
  private easyModeQueue: Socket[] = [];
  private hardModeQueue: Socket[] = [];
  private privateModeQueue: Socket[] = [];
  // array for both queues with key easy and hard
  private clientIdToRoomId: Map<string, string> = new Map();
  private roomIdToGameState: Map<string, GameState> = new Map();
  private userToSocket: UserToSocket[] = [];
  async updateUserStatus(userId: string, status: string) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { status: status },
      });
    } catch (e) {}
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

  addUserToSocket(client: Socket, payload: TypeData): void {
    this.userToSocket.push({
      socket: client,
      user: {
        id: payload.id,
        nickname: payload.nickname,
      },
    });
  }

  getLiveGames(): string[] {
    //  set dummy values
    // this.roomIdToGameState.set('game-1', {} as GameState);
    // this.roomIdToGameState.set('game-2', {} as GameState);
    // this.roomIdToGameState.set('game-3', {} as GameState);
    const ArrayOfStringAndroomId = [];
    this.roomIdToGameState.forEach((gameState, roomId) => {
      const player1 = gameState.players[0];
      const player2 = gameState.players[1];
      if (player1 && player2) {
        ArrayOfStringAndroomId.push({
          roomId,
          players: `${player1.user.nickname} vs ${player2.user.nickname}`,
        });
      }
    });
    // duplicate array
    return ArrayOfStringAndroomId;
  }
  watchGame(client: Socket, roomId: string): void {
    console.log('watching game in room ' + roomId);
    client.join(roomId);
    const gameState = this.roomIdToGameState.get(roomId);
    if (gameState) {
      client.emit('gameState', gameState);
    }
  }

  removePlayer(player: Socket, server: Server): string {
    if (this.easyModeQueue.includes(player)) {
      this.easyModeQueue = this.easyModeQueue.filter((p) => p.id !== player.id);
    } else if (this.hardModeQueue.includes(player)) {
      this.hardModeQueue = this.hardModeQueue.filter((p) => p.id !== player.id);
    } else if (this.privateModeQueue.includes(player)) {
      this.privateModeQueue = this.privateModeQueue.filter(
        (p) => p.id !== player.id,
      );
    } else {
      const roomId = this.clientIdToRoomId.get(player.id);
      if (roomId) {
        console.log('player id ', player.id);
        const gameState = this.roomIdToGameState.get(roomId);
        if (gameState) {
          console.log('GAME STATE');
          const player1 = gameState.players[0];
          const player2 = gameState.players[1];
          if (player1.id === player.id) {
            console.log('player 2 wins');
            console.log(player2.score);
            player2.score = 5;
          } else if (player2.id === player.id) {
            console.log(player2.score);
            console.log('player 1 wins');
            player1.score = 5;
          }
          player.leave(roomId);

          this.roomIdToGameState.delete(roomId);
        }
      }
    }
    const userElement = this.userToSocket.find(
      (u) => u.socket.id === player.id,
    );

    this.userToSocket = this.userToSocket.filter(
      (entry) => entry.socket.id !== player.id,
    );

    return userElement?.user?.id;
  }
  createPlayer(x: number): Player {
    return {
      score: 0,
      dx: 0,
      dy: 20,
      h: 100,
      w: 20,
      x: x,
      y: 600 / 2 - 100 / 2,
      id: '',
      user: {
        nickname: '',
        id: '',
      },
    };
  }
  moveBall(gameState: GameState): void {
    gameState.ball.x += gameState.ball.dx;
    gameState.ball.y += gameState.ball.dy;
  }
  checkIfUserExists(userId: string): boolean {
    const user = this.userToSocket.find((u) => u.user.id === userId);
    if (user) {
      return true;
    }
    return false;
  }

  sendEventToUserSockets(
    userId: string,
    eventName: string,
    data: any,
    server: Server,
  ) {
    const userEntries = this.userToSocket.filter(
      (entry) => entry.user.id === userId,
    );
    userEntries.forEach((entry) => {
      console.log('send event to user socket', eventName, entry.socket.id);
      server.to(entry.socket.id).emit(eventName, data);
    });
  }
  setGame(server: Server, gameState: GameState, mode: string): void {
    let player1: Socket;
    let player2: Socket;

    if (mode === 'easy') {
      player1 = this.easyModeQueue.shift();
      player2 = this.easyModeQueue.shift();
    } else if (mode === 'private') {
      player1 = this.privateModeQueue.shift();
      player2 = this.privateModeQueue.shift();
    } else {
      player1 = this.hardModeQueue.shift();
      player2 = this.hardModeQueue.shift();
    }
    console.log('SET GAME PLAYERS', player1.id, player2.id);
    if (player1 && player2) {
      const roomId = `game-${new Date().getTime()}`;
      gameState.players[0].id = player1.id;
      gameState.players[1].id = player2.id;
      this.roomIdToGameState.set(roomId, gameState);
      player1.join(roomId);
      player2.join(roomId);
      this.clientIdToRoomId.set(player1.id, roomId);
      this.clientIdToRoomId.set(player2.id, roomId);
      const player1Nickname = this.userToSocket.find(
        (u) => u.socket.id === player1.id,
      );
      const player2Nickname = this.userToSocket.find(
        (u) => u.socket.id === player2.id,
      );
      if (player1Nickname) {
        gameState.players[0].user.nickname = player1Nickname.user.nickname;
        gameState.players[0].user.id = player1Nickname.user.id;
      }
      if (player2Nickname) {
        gameState.players[1].user.nickname = player2Nickname.user.nickname;
        gameState.players[1].user.id = player2Nickname.user.id;
      }
      player1.emit('setPlayerId', 0);
      player2.emit('setPlayerId', 1);
      server.to(roomId).emit('launchGame', roomId, gameState, mode);
    }
  }
  inviteAccepted(client: Socket, senderSocketId: any, server: Server) {
    console.log('senderSocketId', senderSocketId.senderSocketId);
    console.log('client', client.id);

    server
      .to([senderSocketId.senderSocketId, client.id])
      .emit('navigateToGame');
    console.log('navigateToGame event sent successfully');
  }
  addToQueue(player: Socket, server: Server, mode: string): void {
    console.log('addToQueue', player.id);
    console.log('mode', mode);
    const gameState: GameState = {
      players: [this.createPlayer(20), this.createPlayer(1200 - 20 - 20)],
      ball: {
        dx: 1.8,
        dy: 1.2,
        h: 20,
        w: 20,
        x: 1200 / 2 - 20 / 2,
        y: 600 / 2 - 20 / 2,
      },
    };
    if (mode === 'easy') this.easyModeQueue.push(player);
    else if (mode === 'private') this.privateModeQueue.push(player);
    else this.hardModeQueue.push(player);

    if (this.easyModeQueue.length >= 2) {
      this.setGame(server, gameState, 'easy');
    } else if (this.privateModeQueue.length >= 2) {
      console.log(
        'GAME SERVICE PRIVATEMODEQUEUE 1',
        this.privateModeQueue[0].id,
      );
      console.log(
        'GAME SERVICE PRIVATEMODEQUEUE 2',
        this.privateModeQueue[1].id,
      );
      this.setGame(server, gameState, 'private');
    } else if (this.hardModeQueue.length >= 2) {
      this.setGame(server, gameState, 'hard');
    } else {
      console.log('waiting in queue', mode);
      player.emit('waitingInQueue', mode);
    }
  }

  goalScored(gameState: GameState, playerId: number): void {
    gameState.players[playerId].score += 1;
    gameState.ball.x = 1200 / 2 - 20 / 2;
    gameState.ball.y = 600 / 2 - 20 / 2;
    gameState.ball.dx *= -1;
  }
  collisionWithPaddle(gameState: GameState): void {
    const tmpGameState = JSON.parse(JSON.stringify(gameState));
    tmpGameState.ball.x += 2 * tmpGameState.ball.dx;
    tmpGameState.ball.y += 2 * tmpGameState.ball.dy;

    if (
      tmpGameState.ball.x <=
        tmpGameState.players[0].x + tmpGameState.players[0].w &&
      tmpGameState.ball.x >= tmpGameState.players[0].x &&
      tmpGameState.ball.y >= tmpGameState.players[0].y &&
      tmpGameState.ball.y <=
        tmpGameState.players[0].y + tmpGameState.players[0].h
    ) {
      if (tmpGameState.ball.dx < 0) gameState.ball.dx *= -1;
    }
    if (
      tmpGameState.ball.x + tmpGameState.ball.w >= tmpGameState.players[1].x &&
      tmpGameState.ball.x + tmpGameState.ball.w <=
        tmpGameState.players[1].x + tmpGameState.players[1].w &&
      tmpGameState.ball.y >= tmpGameState.players[1].y &&
      tmpGameState.ball.y <=
        tmpGameState.players[1].y + tmpGameState.players[1].h
    ) {
      if (tmpGameState.ball.dx > 0) gameState.ball.dx *= -1;
    }
  }

  collisionWithWall(gameState: GameState): void {
    if (gameState.ball.y <= 0 || gameState.ball.y + gameState.ball.h >= 600) {
      gameState.ball.dy *= -1;
    }
  }

  checkGoal(gameState: GameState, mode: string) {
    if (gameState.ball.x <= 0) {
      this.goalScored(gameState, 1);
      if (mode === 'hard') gameState.players[0].h -= 10;
    } else if (gameState.ball.x + gameState.ball.w >= 1200) {
      this.goalScored(gameState, 0);
      if (mode === 'hard') gameState.players[1].h -= 10;
    }
  }

  inviteToPlay(
    senderSocket: Socket,
    senderPayload: TypeData,
    receiverId: string,
    server: Server,
  ) {
    this.sendEventToUserSockets(
      receiverId,
      'invitePlayer',
      {
        sender: senderPayload,
        senderSocketId: senderSocket.id,
      },
      server,
    );
  }
  checkScore(gameState: GameState, roomId: string, server: Server, timer: any) {
    if (gameState.players[0].score === 5) {
      server.to(roomId).emit('gameOver', gameState);
      clearInterval(timer);
      console.log(
        'game over finally',
        gameState.players[0].user.id,
        gameState.players[1].user.id,
        gameState.players[0].score,
        gameState.players[1].score,
      );
      this.storeGame(
        gameState.players[0].user.id,
        gameState.players[1].user.id,
        gameState.players[0].score,
        gameState.players[1].score,
      );
      this.roomIdToGameState.delete(roomId);
      this.clientIdToRoomId.delete(gameState.players[0].id);
      this.clientIdToRoomId.delete(gameState.players[1].id);
    } else if (gameState.players[1].score === 5) {
      server.to(roomId).emit('gameOver', gameState);
      clearInterval(timer);
      console.log(
        'game over finally',
        gameState.players[1].user.id,
        gameState.players[0].user.id,
        gameState.players[1].score,
        gameState.players[0].score,
      );
      this.storeGame(
        gameState.players[1].user.id,
        gameState.players[0].user.id,
        gameState.players[1].score,
        gameState.players[0].score,
      );
      this.roomIdToGameState.delete(roomId);
      this.clientIdToRoomId.delete(gameState.players[1].id);
      this.clientIdToRoomId.delete(gameState.players[0].id);
    } else {
      server.to(roomId).emit('updateGameState', gameState);
    }
  }

  startGame(roomId: string, server: Server, mode: string): void {
    const gameState = this.roomIdToGameState.get(roomId);
    const timer = setInterval(() => {
      if (gameState) {
        this.moveBall(gameState);
        this.collisionWithPaddle(gameState);
        this.collisionWithWall(gameState);
        this.checkGoal(gameState, mode);
        this.checkScore(gameState, roomId, server, timer);
      }
    }, 1000 / 200);
  }

  keyDown(
    client: Socket,
    arrow: string,
    roomId: string,
    playerId: number,
  ): void {
    const gameState = this.roomIdToGameState.get(roomId);

    if (gameState) {
      if (arrow === 'up')
        if (gameState.players[playerId].y - gameState.players[playerId].dy < 0)
          gameState.players[playerId].y = 0;
        else gameState.players[playerId].y -= gameState.players[playerId].dy;
      // if the move is going to surpass the top of the screen get it to the top
      else {
        // if the move is going to surpass the bottom of the screen get it to the bottom
        if (
          gameState.players[playerId].y + gameState.players[playerId].dy >
          600 - gameState.players[playerId].h
        ) {
          gameState.players[playerId].y = 600 - gameState.players[playerId].h;
        }
        // else move the player
        else {
          gameState.players[playerId].y += gameState.players[playerId].dy;
        }
      }
    }
  }
}
