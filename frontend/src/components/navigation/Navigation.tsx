import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Modal, ModalBody, ModalHeader } from "../modals/Modals";
import ModalSearch from "../modals/ModalSearch";
import ModalSettings from "../modals/ModalSettings";
import SettingsModal from "../modals/SettingsModal";
import SearchInput from "../SearchInput";
import ViewSettings from "../ViewSettings";
import { ActiveHome } from "../../pages/Home/Home";
import { ActiveProfile } from "../../pages/Profile/Profile";
import { ActiveProfileUser } from "../../pages/ProfileUser/ProfileUser";

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
      {open && (
        <Modal className="h-[34rem] w-[90%] lg:h-[21.5rem] lg:w-[40rem]">
          <ModalHeader closeModal={() => setOpen(false)}>Settings</ModalHeader>
          <ModalBody className="justify-center">
            <SettingsModal closeModal={() => setOpen(false)} />
          </ModalBody>
        </Modal>
      )}
      {openSearch && (
        <ModalSearch closeModal={() => setOpenSearch(false)}>
          <SearchInput setOpenSearch={setOpenSearch} modal={true} />
        </ModalSearch>
      )}
      {openSettings && (
        <ModalSettings closeModal={() => setOpenSettings(false)}>
          <ViewSettings openModal={() => setOpen(true)} />
        </ModalSettings>
      )}
    </>
  );
}
