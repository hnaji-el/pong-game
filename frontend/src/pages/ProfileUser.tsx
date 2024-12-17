import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Navigation from "../components/navigation/Navigation";
import { CardProfileUser } from "../components/Cards";
import SwitchersProfile from "../components/SwitchersProfile";
import BtnAddFriend from "../components/BtnAddFriend";
import Spinner from "../components/Spinner";
import BtnFriend from "../components/BtnFriend";
import BlockUser from "../components/BlockUser";

import {
  useVerifyUserAuthenticity,
  getDataUserLogged,
  getOneUser,
} from "../api/API";

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

interface TypeDataProfileUser {
  friendsNumber: number;
  id: string;
  isBlockedByLoggedUser: boolean;
  isFriendToLoggedUser: boolean;
  nickname: string;
  pictureURL: string;
  status: string;
  winsNumber: number;
  losesNumber: number;
}

export const ActiveProfileUser = React.createContext<TypeContext>({
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

export const UpdateDataProfileUser = React.createContext<any>({});

function ProfileUser() {
  const status = useVerifyUserAuthenticity();
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state?.id;
  const [typeUser, setTypeUser] = React.useState<string>("");
  const [settings, setSettings] = React.useState<UserData>({
    id: "",
    pictureURL: "",
    nickname: "",
    isTwoFactorAuthEnabled: false,
    status: "",
  });
  const [dataUser, setDataUser] = React.useState<TypeDataProfileUser>({
    friendsNumber: 0,
    id: "",
    isBlockedByLoggedUser: false,
    isFriendToLoggedUser: false,
    nickname: "",
    pictureURL: "",
    status: "",
    winsNumber: 0,
    losesNumber: 0,
  });

  React.useEffect(() => {
    document.title = "Pong - Profile";
  }, []);

  React.useEffect(() => {
    getDataUserLogged((res: UserData) => {
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

  if (status === "error") {
    navigate("/login");
  }

  if (
    status === "pending" ||
    !(
      id !== undefined &&
      dataUser.nickname.length &&
      typeUser.length &&
      settings.nickname.length
    )
  ) {
    return (
      <div className="mx-3 flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <ActiveProfileUser.Provider
      value={{
        value: true,
        settings: settings,
        updateSettings: setSettings,
      }}
    >
      <UpdateDataProfileUser.Provider value={{ setDataUser: setDataUser }}>
        <Navigation />
        <main className="mx-3 flex h-full flex-col gap-12 pb-0 pt-10 lg:ml-64 lg:mr-4">
          {typeUser === "blocked" ? (
            <BlockUser
              id={dataUser.id}
              data={dataUser}
              setTypeUser={setTypeUser}
            />
          ) : (
            <>
              <section className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:justify-between">
                <CardProfileUser data={dataUser} />
                <div className="1xl:flex-row flex flex-row items-center gap-3 lg:flex-col">
                  {typeUser === "friend" ? (
                    <>
                      <BtnFriend id={dataUser.id} setTypeUser={setTypeUser} />
                    </>
                  ) : (
                    <BtnAddFriend id={dataUser.id} setTypeUser={setTypeUser} />
                  )}
                </div>
                <div className="flex gap-10">
                  <span className="flex flex-col items-center">
                    <span className="max-w-[8rem] overflow-hidden text-ellipsis text-4xl font-extrabold text-primaryText">
                      {dataUser.friendsNumber}
                    </span>
                    <span className="text-sm text-secondaryText">Friends</span>
                  </span>
                  <span className="w-[1px] bg-shape"></span>
                  <span className="flex flex-col items-center">
                    <span className="max-w-[8rem] overflow-hidden text-ellipsis text-4xl font-extrabold text-primaryText">
                      {dataUser.winsNumber}
                    </span>
                    <span className="text-sm text-secondaryText">Wins</span>
                  </span>
                  <span className="w-[1px] bg-shape"></span>
                  <span className="flex flex-col items-center">
                    <span className="max-w-[8rem] overflow-hidden text-ellipsis text-4xl font-extrabold text-primaryText">
                      {dataUser.losesNumber}
                    </span>
                    <span className="text-sm text-secondaryText">Losses</span>
                  </span>
                </div>
              </section>
              <SwitchersProfile id={dataUser.id} />
            </>
          )}
        </main>
      </UpdateDataProfileUser.Provider>
    </ActiveProfileUser.Provider>
  );
}

export default ProfileUser;
