import React from "react";

import { Link, useNavigate } from "react-router-dom";

import Navigation from "../components/navigation/Navigation";
import fire from "../assets/fire.png";
import Spinner from "../components/Spinner";

import { useVerifyUserAuthenticity, getDataUserLogged } from "../api/API";

const BACKEND_ORIGIN =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_ORIGIN
    : `${import.meta.env.VITE_BACKEND_ORIGIN}${import.meta.env.VITE_PROXY_PREFIX_FOR_BACKEND}`;

interface UserData {
  id: string;
  pictureURL: string;
  nickname: string;
  isTwoFactorAuthEnabled: boolean;
  status: string;
}

interface TypeContext {
  value: boolean;
  settings: UserData;
  updateSettings: React.Dispatch<React.SetStateAction<UserData>>;
}

export const ActiveHome = React.createContext<TypeContext>({
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

function Home() {
  const status = useVerifyUserAuthenticity();
  const [ArrayofPlayersAndroomId, setArrayofPlayersAndroomId] = React.useState<
    string[]
  >([]);
  const [settings, setSettings] = React.useState<UserData>({
    id: "",
    pictureURL: "",
    nickname: "",
    isTwoFactorAuthEnabled: false,
    status: "offline",
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Pong - Home";
  }, []);

  React.useEffect(() => {
    fetch(`${BACKEND_ORIGIN}/game/liveGames`)
      .then((response) => response.json())
      .then((data) => setArrayofPlayersAndroomId(data))
      .catch((error) => console.log(error));
    getDataUserLogged((res: UserData) => {
      setSettings(res);
    });
  }, []);

  if (status === "error") {
    navigate("/login");
  }

  if (status === "pending" || !settings.nickname.length) {
    return (
      <div className="mx-3 flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <ActiveHome.Provider
      value={{ value: true, settings: settings, updateSettings: setSettings }}
    >
      <Navigation />
      <main className="mx-3 pb-20 pt-10 lg:ml-64 lg:mr-4 lg:pb-1">
        <div className="flex h-full w-full flex-col gap-5">
          <h1 className="flex items-center gap-1.5 text-2xl text-primaryText">
            <span>Live Games</span>
            <img src={fire} alt="fire" className="w-4" />
          </h1>
          {ArrayofPlayersAndroomId.map((element: any) => (
            <div key={element.players}>
              <Link to="/game" state={{ roomId: element.roomId }}>
                <button className="hover:bg-primaryHover rounded bg-primary px-4 py-2 font-bold text-white">
                  {element.players}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </ActiveHome.Provider>
  );
}

export default Home;
