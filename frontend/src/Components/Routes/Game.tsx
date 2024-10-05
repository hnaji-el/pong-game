import { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { GameState } from ".../../../shared/types";
import { io, Socket } from "socket.io-client";
import { getDataUserLogged } from "../../API/API";
import { globalSocket } from "../../helpers/socket";
import { popOutFunc } from "./eventListener";
import { CheckToken } from "../../API/API";

const CANVA_WIDTH = 1200;
const CANVA_HEIGHT = 600;
const BG_COLOR = "black";
const PLAYER_COLOR = "#7970B3";
const domain: any = import.meta.env.VITE_BACKEND_URL;
interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
  isTwoFactorAuthEnabled: boolean;
  status: string;
}

interface TypeContext {
  value: boolean;
  settings: TypeData;
  updateSettings: React.Dispatch<React.SetStateAction<TypeData>>;
}
export const GameContext = createContext<TypeContext>({
  value: false,
  settings: {
    id: "",
    pictureURL: "",
    nickname: "",
    isTwoFactorAuthEnabled: false,
    status: "",
  },
  updateSettings: () => {},
});

export default function Game() {
  CheckToken();
  const [dataUser, setDataUser] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
    isTwoFactorAuthEnabled: false,
    status: "",
  });
  // let cookie = Object.fromEntries(
  // document.cookie.split("; ").map((c) => c.split("="))
  // get cookie using document.cookie to get the auth token
  let cookies = Object.fromEntries(
    document.cookie.split("; ").map((c) => {
      const [key, ...v] = c.split("=");
      return [key, v.join("=")];
    }),
  );
  // cookies["auth-token"] = cookies["auth-token"].replace(/"/g, "");
  const loc = useLocation();
  // if no state is passed, then the user is not joining a game, but creating a new one
  const roomId = loc.state ? loc.state.roomId : undefined;
  const privateQueue = loc.state ? loc.state.privateQueue : undefined;
  const playerIdRef = useRef<number>(-1);
  const navigate = useNavigate();
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    const socket = io(domain, {
      withCredentials: true,
      auth: {
        token: cookies["jwt"],
      },
    });

    socketRef.current = socket;
    getDataUserLogged((res: TypeData) => {
      setDataUser(res);
    });

    if (roomId) {
      gameLogic(roomId, undefined, -1, "undefined", () => {
        navigate("/");
      });
      socket.emit("watchGame", roomId);
      console.log("joining game");
    } else if (privateQueue) {
      console.log("GAME SOCKET", socket);

      socket.emit("queuing", "private");
      socket.on("setPlayerId", (Id: number) => {
        playerIdRef.current = Id;

        // emit to link playerId to
        socket.emit("linkIdToUser", Id, dataUser);
      });
      socket.on(
        "launchGame",
        (roomId: string, gameState: GameState, mode: string) => {
          gameLogic(roomId, gameState, playerIdRef.current, mode, () => {
            navigate("/");
          });
        },
      );
    } else {
      const button = document.getElementById("easy") as HTMLButtonElement;
      button?.addEventListener("click", () => {
        socket.emit("queuing", "easy");
      });
      const button2 = document.getElementById("hard") as HTMLButtonElement;
      button2?.addEventListener("click", () => {
        socket.emit("queuing", "hard");
      });

      socket.on("setPlayerId", (Id: number) => {
        playerIdRef.current = Id;

        // emit to link playerId to
        socket.emit("linkIdToUser", Id, dataUser);
      });
      socket.on(
        "launchGame",
        (roomId: string, gameState: GameState, mode: string) => {
          gameLogic(roomId, gameState, playerIdRef.current, mode, () => {
            navigate("/");
          });
        },
      );
      socket.on("waitingInQueue", (mode: string) => {
        // hide buttons and show waiting message
        console.log("waiting in queue");
        const button = document.getElementById("easy") as HTMLButtonElement;
        button.style.display = "none";
        const button2 = document.getElementById("hard") as HTMLButtonElement;
        button2.style.display = "none";
        const waiting = document.getElementById(
          "waiting",
        ) as HTMLParagraphElement;
        waiting.style.display = "block";
        waiting.classList.add(
          "text-4xl",
          "animate-pulse",
          "font-serif",
          "text-white",
        );
        waiting.innerText = `Waiting for ${mode} game...`;
      });
    }
    function gameLogic(
      roomId: string,
      gameState: GameState | undefined,
      playerId: number,
      mode: string,
      navigate: () => void,
    ) {
      const button = document.getElementById("easy") as HTMLButtonElement;
      button.style.display = "none";
      const button2 = document.getElementById("hard") as HTMLButtonElement;
      button2.style.display = "none";
      const waiting = document.getElementById(
        "waiting",
      ) as HTMLParagraphElement;
      waiting.style.display = "none";

      // const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const canvas: HTMLCanvasElement = document.getElementById(
        "canvas",
      ) as HTMLCanvasElement;
      canvas.style.display = "block";
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
      init(canvas, ctx);
      if (gameState) paintGame(gameState, ctx);
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
          ctx.fillStyle = PLAYER_COLOR;
          ctx.fillText(gameState.players[0].user.nickname + " wins!", 450, 200);
        } else if (gameState.players[0].score < gameState.players[1].score) {
          ctx.fillStyle = PLAYER_COLOR;
          ctx.fillText(gameState.players[1].user.nickname + " wins!", 450, 200);
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
      // globalSocket.off("invitePlayer");
    }
    globalSocket.on("invitePlayer", popOutFunc);
    return () => {
      socket.disconnect();
      // has listener

      globalSocket.off("invitePlayer", popOutFunc);
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
      40,
    );
    ctx.fill();
    ctx.roundRect(
      state.players[1].x,
      state.players[1].y,
      state.players[1].w,
      state.players[1].h,
      40,
    );
    ctx.fill();
    ctx.roundRect(state.ball.x, state.ball.y, state.ball.w, state.ball.h, 40);
    ctx.fill();
    ctx.font = "50px serif";
    ctx.fillText(
      state.players[0].user.nickname +
        " " +
        state.players[0].score +
        " - " +
        state.players[1].score +
        " " +
        state.players[1].user.nickname,
      400,
      100,
    );
  }
  function init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    canvas.height = CANVA_HEIGHT;
    canvas.width = CANVA_WIDTH;
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  // if (dataUser.nickname.length)
  return (
    <GameContext.Provider
      value={{ value: true, settings: dataUser, updateSettings: setDataUser }}
    >
      <Navigation />
      <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">
        <canvas id="canvas" className="hidden"></canvas>
        <div className="flex gap-4">
          <button
            id="easy"
            className="bg-primary text-primaryText text-sm font-bold py-3 px-6 rounded-lg hover:bg-secondary transition-colors duration-300 ease-in-out"
          >
            Easy
          </button>
          <button
            id="hard"
            className="bg-primary text-primaryText text-sm font-bold py-3 px-6 rounded-lg hover:bg-secondary transition-colors duration-300 ease-in-out"
          >
            Hard
          </button>
          <p id="waiting" className="hidden"></p>
        </div>
      </main>
    </GameContext.Provider>
  );
}
