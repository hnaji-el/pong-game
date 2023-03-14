import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import socket from "../socket";
// import {GameState} from "../../../../shared/types"
import { GameState } from ".../../../shared/types";

const CANVA_WIDTH = 600;
const CANVA_HEIGHT = 600;
const BG_COLOR = "black";
const PLAYER_COLOR = "teal";
export default function Game() {
  const loc = useLocation();
  // console.log(`roomId ======= ${loc.state.roomId}`);
  // console.log(`gameState ======= ${loc.state.gameState}`);
  
  useEffect(() => {
    // console.log("LAUNCH GAME .ON from /game");
    gameLogic(loc.state.roomId, loc.state.gameState);
  }, []);
  return (
    <>
      <Navigation />
      <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">
        <canvas id="canvas"></canvas>
      </main>
    </>
  );
}

function paintGame(state: GameState, ctx: CanvasRenderingContext2D) {
  // init() // temporary

  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
  ctx.fillStyle = PLAYER_COLOR;
  ctx.fillRect(
    state.players[0].x,
    state.players[0].y,
    state.players[0].w,
    state.players[0].h
  );
  ctx.fillRect(
    state.players[1].x,
    state.players[1].y,
    state.players[1].w,
    state.players[1].h
  );
  // ctx.roundRect(player.x, player.y, player.w, player.h, [40])
  ctx.fillStyle = PLAYER_COLOR;
  ctx.beginPath();
  ctx.roundRect(state.ball.x, state.ball.y, state.ball.w, state.ball.h, [40]);
  ctx.fill();

  ctx.fillText(
    "Player 1: " +
      state.players[0].score +
      " - " +
      "Player 2: " +
      state.players[1].score,
    250,
    100
  );
}
function init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  // initialScreen.style.display = "none";
  // gameScreen.style.display = "block";
  // canvas.width    = WIDTH;
  // canvas.height   = HEIGHT;
  canvas.width = canvas.height = CANVA_HEIGHT;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// function gameLoop(gameState: GameState, ctx: CanvasRenderingContext2D) {
//   // paintGame();
//   // listening on server gamestate
//   requestAnimationFrame(() => gameLoop(gameState, ctx));
// }

function gameLogic(roomId: string, gameState: GameState) {
  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
  // console.log(`room id: gamelogic ${roomId}`);
  // console.log(gameState);
  // socket.on('initialState',paintGame);

  init(canvas, ctx);
  paintGame(gameState, ctx);

  socket.emit("startingGame", roomId);
  // gameLoop(gameState, ctx);
  socket.on("updateGameState", (gameState: GameState) => {
    paintGame(gameState, ctx);
    // console.log("updateGameState");
  });
  // listen for spacebar
  // gameloop function
  // paintGame();
}
