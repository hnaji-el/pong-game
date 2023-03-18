import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import socket from "../socket";
// import {GameState} from "../../../../shared/types"
import { GameState } from ".../../../shared/types";
import { log } from "console";

const CANVA_WIDTH = 1200;
const CANVA_HEIGHT = 600;
const BG_COLOR = "black";
const PLAYER_COLOR = "#7970B3";
export default function Game() {
  const loc = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    gameLogic(loc.state.roomId, loc.state.gameState, loc.state.playerId, () => {
      navigate("/");
    });
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
  ctx.fillStyle = "#7970B3";
  // fillStyle with  #7970B3
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
  canvas.height = CANVA_HEIGHT;
  canvas.width = CANVA_WIDTH;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// function gameLoop(gameState: GameState, ctx: CanvasRenderingContext2D) {
//   // paintGame();
//   // listening on server gamestate
//   requestAnimationFrame(() => gameLoop(gameState, ctx));
// }

function gameLogic(roomId: string, gameState: GameState, playerId: number, navigate: () => void) {
  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
  init(canvas, ctx);
  paintGame(gameState, ctx);
  socket.emit("startingGame", roomId);
  // gameLoop(gameState, ctx);
  socket.on("updateGameState", (gameState: GameState) => {
    paintGame(gameState, ctx);
  });
  // add socket gameover listener that draws gameover screen with score and a go to first page button
  socket.on("gameOver", (gameState: GameState) => {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
    ctx.fillStyle = PLAYER_COLOR;
    // draw winner is player 1 or player 2

    // paintGame(gameState, ctx);
    // ctx.fillStyle = "white";
    // ctx.fillText(
    //   "Player 1: " +
    //     gameState.players[0].score +
    //     " - " +
    //     "Player 2: " +
    //     gameState.players[1].score,
    //   250,
    //   100
    // );
    // console.log("game over");

    if (gameState.players[0].score > gameState.players[1].score) {
      ctx.fillStyle = "white";
      ctx.fillText("Player 1 wins!", 450, 200);

      console.log("player 1 wins");
    } else if (gameState.players[0].score < gameState.players[1].score) {
      ctx.fillStyle = "white";
      ctx.fillText("Player 2 wins!", 450, 200);
      console.log("player 2 wins");
    }
    const button = document.createElement("button");
    button.innerHTML = "Go back to main page";
    button.style.backgroundColor = "white";
    button.style.zIndex = "999";
    // const Navigate = useNavigate();
    button.onclick = function () {
      // Navigate("/");
      navigate();
      // window.location.href = "mainpage.html";
    };
    // document.body.appendChild(button);
    // canvas.appendChild(button);
    console.log(canvas);
    
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      socket.emit("keyDown", {
        arrow: "up",
        roomId: roomId,
        playerId: playerId,
      });
    } else if (e.key === "ArrowDown") {
      socket.emit("keyDown", {
        arrow: "down",
        roomId: roomId,
        playerId: playerId,
      });
    }
    //
  });
}
