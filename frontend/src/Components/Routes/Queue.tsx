// import { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { GameState } from "../../../shared/types";

export default function Queue() {
  const navigate = useNavigate();
  let playerId: number;

  socket.emit("queuing");
  // console.log("LAUNCH GAME");
  socket.on("launchGame", (roomId : string, gameState :GameState) => {
    navigate("/game", {state:{roomId, gameState, playerId}});
    // console.log("LAUNCH GAME .ON from /queue");
  });
  socket.on("setPlayerId", (Id: number) => {
    // console.log("playerId" + playerId);
    playerId = Id;
    
  });
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/game");
  //   }, 3000);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <Navigation />
      <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">Waiting</main>
    </>
  );
}
