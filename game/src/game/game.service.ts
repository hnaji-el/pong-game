import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { GameState, Player, Ball } from 'shared/types';
import { log } from 'console';
// import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class GameService {
  // private Players: Socket[] = [];
  private players: { hard: Socket[]; easy: Socket[] } = {
    hard: [],
    easy: [],
  };
  private roomIdToGameState: Map<string, GameState> = new Map();
  createPlayer(x: number): Player {
    return {
      score: 0,
      dx: 0,
      dy: 20,
      h: 100,
      w: 20,
      x: x,
      y: 600 / 2 - 100 / 2,
    };
  }
  moveBall(gameState: GameState): void {
    gameState.ball.x += gameState.ball.dx;
    gameState.ball.y += gameState.ball.dy;
  }
  addToQueue(player: Socket, server: Server, mode: string): void {
    // log mode
    const a: GameState = {
      players: [this.createPlayer(20), this.createPlayer(1200 - 20 - 20)],
      ball: {
        dx: 0.8,
        dy: 1.2,
        h: 20,
        w: 20,
        x: 1200 / 2 - 20 / 2,
        y: 600 / 2 - 20 / 2,
      },
    };
    this.players[mode].push(player);
    if (this.players[mode].length >= 2) {
      const player1 = this.players[mode].shift();
      const player2 = this.players[mode].shift();
      console.log(this.players[mode].length);
      if (player1 && player2) {
        const roomId = `game-${new Date().getTime()}`;
        // console.log('roomId', roomId);

        this.roomIdToGameState.set(roomId, a);
        player1.join(roomId);
        player2.join(roomId);
        // send to each player so they can keep their id for paddle
        player1.emit('setPlayerId', 0);
        player2.emit('setPlayerId', 1);
        // console.log('setPLAYER');

        server.to(roomId).emit('launchGame', roomId, a, mode);
        // server.to(roomId).emit('setPlayerId', 1);

        // return roomId;
      }
    } else {
      player.emit('waitingInQueue');
    }
  }

  goalScored(gameState: GameState, playerId: number, mode): void {
    gameState.players[playerId].score += 1;
    if (mode === 'hard') gameState.players[1 - playerId].h -= 8;
    gameState.ball.x = 1200 / 2 - 20 / 2;
    gameState.ball.y = 600 / 2 - 20 / 2;
    // wait a bit before starting again
    gameState.ball.dx *= -1;
    // setTimeout(() => {
    // }, 1000);
  }

  collisionWithPaddle(gameState: GameState): void {
    // create a tmp gameState with the new position of the ball
    const tmpGameState = JSON.parse(JSON.stringify(gameState));
    // this.moveBall(tmpGameState);
    // check if the ball is colliding with the paddle
    // move ball enough to not have collision and ball go inside paddle
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
      // dont collide with paddle if ball is going away from paddle
      // collide only if ball is going towards paddle
      if (tmpGameState.ball.dx < 0) gameState.ball.dx *= -1;

      // if (tmpGameState.ball.dx < 0) {

      // gameState.ball.dx *= -1;
    }
    if (
      tmpGameState.ball.x + tmpGameState.ball.w >= tmpGameState.players[1].x &&
      tmpGameState.ball.x + tmpGameState.ball.w <=
        tmpGameState.players[1].x + tmpGameState.players[1].w &&
      tmpGameState.ball.y >= tmpGameState.players[1].y &&
      tmpGameState.ball.y <=
        tmpGameState.players[1].y + tmpGameState.players[1].h
    ) {
      // collide only if ball is going towards paddle
      if (tmpGameState.ball.dx > 0) gameState.ball.dx *= -1;
      // gameState.ball.dx *= -1;
    }
  }

  collisionWithWall(gameState: GameState): void {
    if (gameState.ball.y <= 0 || gameState.ball.y + gameState.ball.h >= 600) {
      gameState.ball.dy *= -1;
    }
  }

  checkGoal(gameState: GameState, mode: string) {
    if (gameState.ball.x <= 0) {
      this.goalScored(gameState, 1, mode);
    } else if (gameState.ball.x + gameState.ball.w >= 1200) {
      this.goalScored(gameState, 0, mode);
    }
  }
  checkScore(gameState: GameState, roomId: string, server: Server, timer: any) {
    if (gameState.players[0].score === 5) {
      server.to(roomId).emit('gameOver', gameState);
      clearInterval(timer);
    } else if (gameState.players[1].score === 5) {
      server.to(roomId).emit('gameOver', gameState);
      clearInterval(timer);
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
    // console.log(roomId);

    if (gameState) {
      if (arrow === 'up') {
        // paddle should not go out of the screen
        if (gameState.players[playerId].y > 0)
          gameState.players[playerId].y -= gameState.players[playerId].dy;
      } else {
        // paddle should not go out of the screen
        if (gameState.players[playerId].y + gameState.players[playerId].h < 600)
          gameState.players[playerId].y += gameState.players[playerId].dy;
      }
    }
  }
}
