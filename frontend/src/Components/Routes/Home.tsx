import React, { useEffect, createContext, useState } from "react";
import Navigation from "../Navigation/Navigation";
import fire from "../../assets/fire.png";
import { Link } from "react-router-dom";

export const ActiveHome = createContext<boolean>(false);

// interface Game {
//   id: string;
//   name: string;
//   description: string;
// }

export default function Home() {
  const [roomIds, setroomIds] = useState<string[]>([]);

  useEffect(() => {
    document.title = "Pong - Home";
    fetch("http://192.168.1.2:3000/game/liveGames")
      .then((response) => response.json())
      .then((data) => setroomIds(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ActiveHome.Provider value={true}>
      <Navigation />
      <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">
        <div className="flex flex-col gap-5 w-full h-full">
          <h1 className="text-primaryText text-2xl flex items-center gap-1.5">
            <span>Live Games</span>
            <img src={fire} alt="fire" className="w-4" />
          </h1>
          <section className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {roomIds.map((roomId: string) => (
              <div key={roomId}>
                <Link to="/Game" state={{ roomId: roomId }}>
                  <button>{roomId}</button>
                </Link>
              </div>
            ))}
          </section>
        </div>
      </main>
    </ActiveHome.Provider>
  );
}
