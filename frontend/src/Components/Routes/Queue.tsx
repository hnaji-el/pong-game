import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { GameState } from "../../../shared/types";

enum GameMode {
  EASY = "easy",
  HARD = "hard",
}

export default function Queue() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    socket.emit("queuing", mode);
  };

  socket.on(
    "launchGame",
    (roomId: string, gameState: GameState, mode: string) => {
      navigate("/game", { state: { roomId, gameState, playerId, mode } });
    }
  );

  socket.on("setPlayerId", (id: number) => {
    setPlayerId(id);
  });

  return (
    <>
      <Navigation />
      <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">
        {selectedMode === null ? (
          <>
            <h2 className="text-lg font-medium mb-2">Select a game mode:</h2>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleModeSelect(GameMode.EASY)}
              >
                Easy
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleModeSelect(GameMode.HARD)}
              >
                Hard
              </button>
            </div>
          </>
        ) : (
          <p>Waiting for an opponent in {selectedMode} mode...</p>
        )}
      </main>
    </>
  );
}
