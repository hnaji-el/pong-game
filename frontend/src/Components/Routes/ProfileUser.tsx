import React, { createContext, useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { CardProfileUser } from "../Cards";
import SwitchersProfile from "../SwitchersProfile";
import { BtnMessage } from "../BtnMessage";
import BtnAddFriend from "../BtnAddFriend";
import { getDataUserLogged, getOneUser } from "../../API";
import Spinner from "../Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import BtnFriend from "../BtnFriend";
import BlockUser from "../BlockUser";

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
}

interface TypeContext {
  value: boolean;
  settings: TypeData;
  updateSettings: React.Dispatch<React.SetStateAction<TypeData>>;
}

interface TypeDataProfileUser {
  friendsNumber: number;
  id: string;
  isBlockedByLoggedUser: boolean;
  isFriendToLoggedUser: boolean;
  nickname: string;
  pictureURL: string;
  status: string;
}

export const ActiveProfileUser = createContext<TypeContext>({
  value: false,
  settings: { id: "", pictureURL: "", nickname: "" },
  updateSettings: () => {},
});

export default function ProfileUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state?.id;
  const [typeUser, setTypeUser] = useState<string>("");
  const [settings, setSettings] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
  });
  const [dataUser, setDataUser] = useState<TypeDataProfileUser>({
    friendsNumber: 0,
    id: "",
    isBlockedByLoggedUser: false,
    isFriendToLoggedUser: false,
    nickname: "",
    pictureURL: "",
    status: "",
  });
  useEffect(() => {
    document.title = "Pong - Profile";
    getDataUserLogged((res: TypeData) => {
      setSettings(res);
    });

    getOneUser((res: TypeDataProfileUser) => {
      setDataUser(res);
      if (res.isFriendToLoggedUser) setTypeUser("friend");
      else if (res.isBlockedByLoggedUser) setTypeUser("blocked");
      else setTypeUser("notFriend");
    }, id);
  }, [id]);

  if (id === undefined) navigate(-1);

  if (
    id !== undefined &&
    dataUser.nickname.length &&
    typeUser.length &&
    settings.nickname.length
  )
    return (
      <ActiveProfileUser.Provider
        value={{
          value: true,
          settings: settings,
          updateSettings: setSettings,
        }}
      >
        <Navigation />
        <main className="mx-3 pt-10 lg:ml-64 lg:mr-4 flex flex-col gap-12 h-full pb-0">
          {typeUser === "blocked" ? (
            <BlockUser
              id={dataUser.id}
              data={dataUser}
              setTypeUser={setTypeUser}
            />
          ) : (
            <>
              <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
                <CardProfileUser data={dataUser} />
                <div className="flex flex-row lg:flex-col 1xl:flex-row items-center gap-3">
                  {typeUser === "friend" ? (
                    <>
                      <BtnFriend id={dataUser.id} setTypeUser={setTypeUser} />
                      <BtnMessage />
                    </>
                  ) : (
                    <BtnAddFriend id={dataUser.id} setTypeUser={setTypeUser} />
                  )}
                </div>
                <div className="flex gap-10">
                  <span className="flex flex-col items-center">
                    <span className="text-primaryText text-4xl font-extrabold max-w-[8rem] overflow-hidden text-ellipsis">
                      {dataUser.friendsNumber}
                    </span>
                    <span className="text-secondaryText text-sm">Friends</span>
                  </span>
                  <span className="w-[1px] bg-shape"></span>
                  <span className="flex flex-col items-center">
                    <span className="text-primaryText text-4xl font-extrabold max-w-[8rem] overflow-hidden text-ellipsis">
                      0
                    </span>
                    <span className="text-secondaryText text-sm ">Wins</span>
                  </span>
                  <span className="w-[1px] bg-shape"></span>
                  <span className="flex flex-col items-center">
                    <span className="text-primaryText text-4xl font-extrabold max-w-[8rem] overflow-hidden text-ellipsis">
                      0
                    </span>
                    <span className="text-secondaryText text-sm ">Losses</span>
                  </span>
                </div>
              </section>
                <SwitchersProfile id={dataUser.id}/>
            </>
          )}
        </main>
      </ActiveProfileUser.Provider>
    );

  return (
    <div className="mx-3 flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
}
