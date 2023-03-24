import React, { useEffect, useState, createContext } from "react";
import Navigation from "../Navigation/Navigation";
import { CardProfile } from "../Cards";
import SwitchersProfile from "../SwitchersProfile";
import { Modal, ModalBody, ModalHeader } from "../Modals/Modals";
import SettingsBody from "../Modals/Settings/SettingsBody";
import Spinner from "../Spinner";
import { getDataUserLogged } from "../../API";

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

export const ActiveProfile = createContext<TypeContext>({
  value: false,
  settings: { id: "", pictureURL: "", nickname: "" },
  updateSettings: () => {},
});

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
  });

  useEffect(() => {
    document.title = "Pong - Profile";
    getDataUserLogged((res: TypeData) => {
      setSettings(res);
    });
  }, []);

  if (settings.nickname.length)
    return (
      <ActiveProfile.Provider
        value={{ value: true, settings: settings, updateSettings: setSettings }}
      >
        <Navigation />
        <main className="mx-3 pt-10 lg:ml-64 lg:mr-4 flex flex-col gap-12 h-full pb-0">
          <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
            <CardProfile setOpen={setOpen} />
            <div className="flex gap-10">
              <span className="flex flex-col items-center">
                <span className="text-primaryText text-4xl font-extrabold max-w-[8rem] overflow-hidden text-ellipsis">
                  10
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
          <SwitchersProfile />
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
    <div className="mx-3 pb-20 lg:pb-0 lg:ml-64 lg:mr-4 flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
}
