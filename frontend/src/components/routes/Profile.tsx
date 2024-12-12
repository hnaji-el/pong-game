import React, { useEffect, useState, createContext } from "react";
import Navigation from "../navigation/Navigation";
import { CardProfile } from "../Cards";
import SwitchersProfile from "../SwitchersProfile";
import { Modal, ModalBody, ModalHeader } from "../modals/Modals";
import SettingsBody from "../modals/settings/SettingsBody";
import Spinner from "../Spinner";
import {
  verifyUserAuthenticity,
  getDataUserLogged,
  getOneUser,
} from "../../api/API";

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

export const ActiveProfile = createContext<TypeContext>({
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

export default function Profile() {
  verifyUserAuthenticity();
  const [open, setOpen] = useState<boolean>(false);
  const [dataGame, setDataGame] = useState<any>({});
  const [settings, setSettings] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
    isTwoFactorAuthEnabled: false,
    status: "",
  });

  useEffect(() => {
    document.title = "Pong - Profile";
    getDataUserLogged((res: TypeData) => {
      setSettings(res);
      getOneUser((response: any) => {
        setDataGame(response);
      }, res.id);
    });
  }, []);

  if (settings.nickname.length)
    return (
      <ActiveProfile.Provider
        value={{ value: true, settings: settings, updateSettings: setSettings }}
      >
        <Navigation />
        <main className="mx-3 flex h-full flex-col gap-12 pb-0 pt-10 lg:ml-64 lg:mr-4">
          <section className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:justify-between">
            <CardProfile setOpen={setOpen} />
            <div className="flex gap-10">
              <span className="flex flex-col items-center">
                <span className="max-w-[8rem] overflow-hidden text-ellipsis text-4xl font-extrabold text-primaryText">
                  {dataGame.friendsNumber}
                </span>
                <span className="text-sm text-secondaryText">Friends</span>
              </span>
              <span className="w-[1px] bg-shape"></span>
              <span className="flex flex-col items-center">
                <span className="max-w-[8rem] overflow-hidden text-ellipsis text-4xl font-extrabold text-primaryText">
                  {dataGame.winsNumber}
                </span>
                <span className="text-sm text-secondaryText">Wins</span>
              </span>
              <span className="w-[1px] bg-shape"></span>
              <span className="flex flex-col items-center">
                <span className="max-w-[8rem] overflow-hidden text-ellipsis text-4xl font-extrabold text-primaryText">
                  {dataGame.losesNumber}
                </span>
                <span className="text-sm text-secondaryText">Losses</span>
              </span>
            </div>
          </section>
          <SwitchersProfile id={settings.id} />
        </main>
        {open ? (
          <Modal edit="w-[90%] h-[34rem] lg:w-[40rem] lg:h-[21.5rem]">
            <ModalHeader setOpen={setOpen}>Settings</ModalHeader>
            <ModalBody edit="justify-center">
              <SettingsBody setOpen={setOpen} />
            </ModalBody>
          </Modal>
        ) : null}
      </ActiveProfile.Provider>
    );

  return (
    <div className="mx-3 flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
}
