import React from "react";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Modal, ModalBody, ModalHeader } from "../modals/Modals";
import SearchModal from "../modals/SearchModal";
import MobileSettingsModal from "../modals/MobileSettingsModal";
import SettingsModal from "../modals/SettingsModal";
import SearchInput from "../SearchInput";
import ViewSettings from "../ViewSettings";

import { ActiveHome } from "../../pages/Home/Home";
import { ActiveProfile } from "../../pages/Profile/Profile";
import { ActiveProfileUser } from "../../pages/ProfileUser/ProfileUser";
import { GameContext } from "../../pages/Game/Game";

export default function Navigation() {
  let dataUserLogged = React.useContext(ActiveHome);
  const dataUserLoggedProfile = React.useContext(ActiveProfile);
  const dataUserLoggedProfileUser = React.useContext(ActiveProfileUser);
  const dataUserLoggedGame = React.useContext(GameContext);

  const [open, setOpen] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedGame;

  return (
    <>
      <NavBar setOpen={setOpen} />
      <SideBar
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
      />
      {open && (
        <Modal className="h-[34rem] w-[90%] lg:h-[21.5rem] lg:w-[40rem]">
          <ModalHeader closeModal={() => setOpen(false)}>Settings</ModalHeader>
          <ModalBody className="justify-center">
            <SettingsModal
              loggedUserData={dataUserLogged.settings}
              setLoggedUserData={dataUserLogged.updateSettings}
              closeModal={() => setOpen(false)}
            />
          </ModalBody>
        </Modal>
      )}
      {openSearch && (
        <SearchModal closeModal={() => setOpenSearch(false)}>
          <SearchInput setOpenSearch={setOpenSearch} modal={true} />
        </SearchModal>
      )}
      {openSettings && (
        <MobileSettingsModal closeModal={() => setOpenSettings(false)}>
          <ViewSettings openModal={() => setOpen(true)} />
        </MobileSettingsModal>
      )}
    </>
  );
}
