import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Modal, ModalBody, ModalHeader } from "../modals/Modals";
import ModalSearch from "../modals/ModalSearch";
import ModalSettings from "../modals/ModalSettings";
import SettingsBody from "../modals/settings/SettingsBody";
import SearchInput from "../SearchInput";
import ViewSettings from "../ViewSettings";
import { ActiveHome } from "../routes/Home";
import { ActiveProfile } from "../routes/Profile";
import { ActiveProfileUser } from "../routes/ProfileUser";

export default function Navigation() {
  const [open, setOpen] = useState<boolean>(false);
  let dataUserLogged = useContext(ActiveHome);
  let dataUserLoggedProfile = useContext(ActiveProfile);
  let dataUserLoggedProfileUser = useContext(ActiveProfileUser);
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  return (
    <>
      <NavBar setOpen={setOpen} />
      <SideBar
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
      />
      {open ? (
        <Modal edit="w-[90%] h-[34rem] lg:w-[40rem] lg:h-[21.5rem]">
          <ModalHeader setOpen={setOpen}>Settings</ModalHeader>
          <ModalBody edit="justify-center">
            <SettingsBody setOpen={setOpen} />
          </ModalBody>
        </Modal>
      ) : null}
      {openSearch ? (
        <ModalSearch setOpenSearch={setOpenSearch}>
          <SearchInput setOpenSearch={setOpenSearch} modal={true} />
        </ModalSearch>
      ) : null}
      {openSettings ? (
        <ModalSettings setOpenSettings={setOpenSettings}>
          <ViewSettings setOpen={setOpen} />
        </ModalSettings>
      ) : null}
    </>
  );
}
