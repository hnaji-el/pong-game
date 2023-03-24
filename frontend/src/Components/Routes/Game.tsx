import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
// import socket from "../socket";
import { GameState } from ".../../../shared/types";
import { log } from "console";
import { io, Socket } from "socket.io-client";

const CANVA_WIDTH = 1200;
const CANVA_HEIGHT = 600;
const BG_COLOR = "black";
const PLAYER_COLOR = "#7970B3";
export default function Game() {
  const loc = useLocation();
  // if no state is passed, then the user is not joining a game, but creating a new one
  const roomId = loc.state ? loc.state.roomId : undefined;
  let socket: Socket;
  const playerIdRef = useRef<number>(-1);
  const navigate = useNavigate();

  useEffect(() => {
    socket = io("http://192.168.1.2:3000");
    if (roomId) {
      gameLogic(roomId, undefined, -1, 'undefined', () => {
        navigate("/");
      });
      socket.emit("watchGame", roomId);
      console.log("joining game");
    } else {
      const button = document.getElementById("easy") as HTMLButtonElement;
      button.addEventListener("click", () => {
        socket.emit("queuing", "easy");
      });
      const button2 = document.getElementById("hard") as HTMLButtonElement;
      button2.addEventListener("click", () => {
        socket.emit("queuing", "hard");
      });

      socket.on("setPlayerId", (Id: number) => {
        playerIdRef.current = Id;
      });
      socket.on(
        "launchGame",
        (roomId: string, gameState: GameState, mode: string) => {
          gameLogic(roomId, gameState, playerIdRef.current, mode, () => {
            navigate("/");
          });
        }
      );
      socket.on("waitingInQueue", (mode: string) => {
        // hide buttons and show waiting message
        console.log("waiting in queue");
        const button = document.getElementById("easy") as HTMLButtonElement;
        button.style.display = "none";
        const button2 = document.getElementById("hard") as HTMLButtonElement;
        button2.style.display = "none";
        const waiting = document.getElementById(
          "waiting"
        ) as HTMLParagraphElement;
        waiting.style.display = "block";
        waiting.innerText = `Waiting for ${mode} game...`;
      });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  function paintGame(state: GameState, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
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
    canvas.width = CANVA_WIDTH;
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  function gameLogic(
    roomId: string,
    gameState: GameState | undefined,
    playerId: number,
    mode: string,
    navigate: () => void
  ) {
    const button = document.getElementById("easy") as HTMLButtonElement;
    button.style.display = "none";
    const button2 = document.getElementById("hard") as HTMLButtonElement;
    button2.style.display = "none";
    const waiting = document.getElementById("waiting") as HTMLParagraphElement;
    waiting.style.display = "none";

    // const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    canvas.style.display = "block";
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    init(canvas, ctx);
    if (gameState)
      paintGame(gameState, ctx);
    if (playerId === 0) {
      socket.emit("startingGame", {
        roomId: roomId,
        mode: mode,
      });
    }
    socket.on("updateGameState", (gameState: GameState) => {
      paintGame(gameState, ctx);
    });
    socket.on("gameOver", (gameState: GameState) => {
      console.log("gameOver");
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, CANVA_WIDTH, CANVA_HEIGHT);
      ctx.fillStyle = PLAYER_COLOR;
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
    });
  }
  return (
    <>
      <Navigation />
      <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">
        <canvas id="canvas" className="hidden"></canvas>
        <div className="flex gap-4">
          <button
            id="easy"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Easy
          </button>
          <button
            id="hard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Hard
          </button>
          <p id="waiting" className="hidden"></p>
        </div>
      </main>
    </>
  );
}
