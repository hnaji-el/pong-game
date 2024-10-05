import React, { useEffect, createContext, useState } from "react";
import Navigation from "../Navigation/Navigation";
import fire from "../../assets/fire.png";
import { CheckToken, getDataUserLogged } from "../../API/API";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
const domain = import.meta.env.VITE_BACKEND_URL;
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

export const ActiveHome = createContext<TypeContext>({
  value: false,
  settings: {
    id: "",
    pictureURL: "",
    nickname: "",
    isTwoFactorAuthEnabled: false,
    status: "offline",
  },
  updateSettings: () => {},
});

export default function Home() {
  CheckToken();
  const [ArrayofPlayersAndroomId, setArrayofPlayersAndroomId] = useState<
    string[]
  >([]);
  // const [roomIds, setroomIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
    isTwoFactorAuthEnabled: false,
    status: "offline",
  });

  useEffect(() => {
    document.title = "Pong - Home";
    fetch(`${domain}/game/liveGames`)
      .then((response) => response.json())
      .then((data) => setArrayofPlayersAndroomId(data))
      .catch((error) => console.log(error));
    getDataUserLogged((res: TypeData) => {
      setSettings(res);
    });
  }, []);

  if (settings.nickname.length)
    return (
      <ActiveHome.Provider
        value={{ value: true, settings: settings, updateSettings: setSettings }}
      >
        <Navigation />
        <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">
          <div className="flex flex-col gap-5 w-full h-full">
            <h1 className="text-primaryText text-2xl flex items-center gap-1.5">
              <span>Live Games</span>
              <img src={fire} alt="fire" className="w-4" />
            </h1>
            {ArrayofPlayersAndroomId.map((element: any) => (
              <div key={element.players}>
                <Link to="/Game" state={{ roomId: element.roomId }}>
                  <button className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded">
                    {element.players}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </ActiveHome.Provider>
    );
  return (
    <div className="mx-3 flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
}
