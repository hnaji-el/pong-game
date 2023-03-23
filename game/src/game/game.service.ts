import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { GameState, Player, Ball } from 'shared/types';
import { log } from 'console';
// import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class GameService {
  private easyModeQueue: Socket[] = [];
  private hardModeQueue: Socket[] = [];
  // array for both queues with key easy and hard
  private clientIdToRoomId: Map<string, string> = new Map();
  private roomIdToGameState: Map<string, GameState> = new Map();
  removePlayer(player: Socket, server: Server): void {
    if (this.easyModeQueue.includes(player)) {
      this.easyModeQueue = this.easyModeQueue.filter((p) => p.id !== player.id);
    } else if (this.hardModeQueue.includes(player)) {
      this.hardModeQueue = this.hardModeQueue.filter((p) => p.id !== player.id);
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
          // finish game
          // server.to(roomId).emit('finishGame');
        }
      }
    }
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
    };
  }
  moveBall(gameState: GameState): void {
    gameState.ball.x += gameState.ball.dx;
    gameState.ball.y += gameState.ball.dy;
  }

  setGame(server: Server, gameState: GameState, mode: string): void {
    let player1: Socket;
    let player2: Socket;

    if (mode === 'easy') {
      player1 = this.easyModeQueue.shift();
      player2 = this.easyModeQueue.shift();
    } else {
      player1 = this.hardModeQueue.shift();
      player2 = this.hardModeQueue.shift();
    }
    if (player1 && player2) {
      const roomId = `game-${new Date().getTime()}`;
      console.log('roomId', roomId);
      gameState.players[0].id = player1.id;
      gameState.players[1].id = player2.id;
      this.roomIdToGameState.set(roomId, gameState);
      player1.join(roomId);
      player2.join(roomId);
      this.clientIdToRoomId.set(player1.id, roomId);
      this.clientIdToRoomId.set(player2.id, roomId);
      player1.emit('setPlayerId', 0);
      player2.emit('setPlayerId', 1);
      server.to(roomId).emit('launchGame', roomId, gameState, mode);
    }
  }
  addToQueue(player: Socket, server: Server, mode: string): void {
    // console.log('addToQueue');
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
    else this.hardModeQueue.push(player);

    if (this.easyModeQueue.length >= 2) {
      this.setGame(server, gameState, 'easy');
    } else if (this.hardModeQueue.length >= 2) {
      this.setGame(server, gameState, 'hard');
    } else {
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

  checkScore(gameState: GameState, roomId: string, server: Server, timer: any) {
    if (gameState.players[0].score === 5) {
      server.to(roomId).emit('gameOver', gameState);
      clearInterval(timer);
      this.roomIdToGameState.delete(roomId);
      this.clientIdToRoomId.delete(gameState.players[0].id);
      this.clientIdToRoomId.delete(gameState.players[1].id);
    } else if (gameState.players[1].score === 5) {
      server.to(roomId).emit('gameOver', gameState);
      clearInterval(timer);
      this.roomIdToGameState.delete(roomId);
      this.clientIdToRoomId.delete(gameState.players[0].id);
      this.clientIdToRoomId.delete(gameState.players[1].id);
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
      if (arrow === 'up') {
        gameState.players[playerId].y -= gameState.players[playerId].dy;
      } else {
        gameState.players[playerId].y += gameState.players[playerId].dy;
      }
    }
  }
}
