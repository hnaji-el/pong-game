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
  addToQueue(player: Socket, server: Server): void {
    const a: GameState = {
      players: [this.createPlayer(20), this.createPlayer(600 - 20 - 20)],
      ball: {
        dx: 20,
        dy: 20,
        h: 20,
        w: 20,
        x: 600 / 2 - 20 / 2,
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
        server.to(roomId).emit('launchGame', roomId, a);

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
        gameState.ball.x += gameState.ball.dx;
        gameState.ball.y += gameState.ball.dy;
        server.to(roomId).emit('updateGameState', gameState);
        // console.log('update game state');
      }
    }, 1000 / 60);
  }
}
