import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import socket from "../socket";
import { GameState } from ".../../../shared/types";

let CANVA_WIDTH: number;
let CANVA_HEIGHT: number;
const BG_COLOR = "black";
const PLAYER_COLOR = "#7970B3";
export default function Game() {
  const loc = useLocation();
  console.log(loc.state.roomId);
  console.log(loc.state.gameState);
  console.log(loc.state.playerId);
  console.log(loc.state.mode);
  
  const navigate = useNavigate();
  useEffect(() => {
    gameLogic(
      loc.state.roomId,
      loc.state.gameState,
      loc.state.playerId,
      loc.state.mode,
      () => {
        navigate("/");
      }
    );
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
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
  ctx.fillStyle = PLAYER_COLOR;
  ctx.fillStyle = PLAYER_COLOR;
  ctx.beginPath();
  ctx.roundRect(
    state.players[0].x,
    state.players[0].y,
    state.players[0].w,
    state.players[0].h,
    40
  );
  ctx.fill();
  ctx.roundRect(
    state.players[1].x,
    state.players[1].y,
    state.players[1].w,
    state.players[1].h,
    40
  );
  ctx.fill();
  ctx.roundRect(state.ball.x, state.ball.y, state.ball.w, state.ball.h, 40);
  ctx.fill();
  ctx.font = "50px serif";
  ctx.fillText(
    "Player 1: " +
      state.players[0].score +
      " - " +
      "Player 2: " +
      state.players[1].score,
    400,
    100
  );
}
function init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  canvas.height = CANVA_HEIGHT;
  CANVA_HEIGHT = 600;
  CANVA_WIDTH = 1200;
  canvas.width = CANVA_WIDTH;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function gameLogic(
  roomId: string,
  gameState: GameState,
  playerId: number,
  mode: string,
  navigate: () => void
) {
  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

  init(canvas, ctx);
  paintGame(gameState, ctx);
  socket.emit("startingGame", { roomId, mode});
  socket.on("updateGameState", (gameState: GameState) => {
    paintGame(gameState, ctx);
  });
  socket.on("gameOver", (gameState: GameState) => {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
    ctx.fillStyle = PLAYER_COLOR;
    if (gameState.players[0].score > gameState.players[1].score) {
      ctx.fillStyle = "white";
      ctx.fillText("Player 1 wins!", 450, 450);
    } else if (gameState.players[0].score < gameState.players[1].score) {
      ctx.fillStyle = "white";
      ctx.fillText("Player 2 wins!", 450, 450);
      console.log("player 2 wins");
    }
    const button = document.createElement("button");
    button.innerHTML = "Go back to main page";
    button.style.backgroundColor = "white";
    button.style.zIndex = "999";
    button.onclick = function () {
      navigate();
    };
    // document.body.appendChild(button);
    // canvas.appendChild(button);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      console.log(roomId);
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
  });
}
