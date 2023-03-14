import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { GameState, Player, Ball } from 'shared/types';
import { log } from 'console';
// import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class GameService {
  private players: Socket[] = [];
  // map roomId to game state
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
  addToQueue(player: Socket, server: Server): void {
    const a: GameState = {
      players: [this.createPlayer(20), this.createPlayer(1200 - 20 - 20)],
      ball: {
        dx: 1,
        dy: 2,
        h: 20,
        w: 20,
        x: 1200 / 2 - 20 / 2,
        y: 600 / 2 - 20 / 2,
      },
    };
    this.players.push(player);
    if (this.players.length >= 2) {
      const player1 = this.players.shift();
      const player2 = this.players.shift();
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

        server.to(roomId).emit('launchGame', roomId, a);
        // server.to(roomId).emit('setPlayerId', 1);

        // return roomId;
      }
    } else {
      player.emit('waitingInQueue');
    }
  }

  startGame(roomId: string, server: Server): void {
    // console.log('start game');

    const gameState = this.roomIdToGameState.get(roomId);
    // console.log(roomId);

    // keep updating ball position
    setInterval(() => {
      if (gameState) {
        this.moveBall(gameState);
        // collision in every corner to keep the ball moving each side
        if (
          gameState.ball.x <= 0 ||
          gameState.ball.x + gameState.ball.w >= 1200
        ) {
          gameState.ball.dx *= -1;
        }
        if (
          gameState.ball.y <= 0 ||
          gameState.ball.y + gameState.ball.h >= 600
        ) {
          gameState.ball.dy *= -1;
        }
        server.to(roomId).emit('updateGameState', gameState);
        // console.log('update game state');
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
