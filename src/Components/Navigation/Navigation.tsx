import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Modal, ModalBody, ModalHeader } from "../Modals/Modals";
import ModalSearch from "../Modals/ModalSearch";
import ModalSettings from "../Modals/ModalSettings";
import SettingsBody from "../Modals/Settings/SettingsBody";
import SearchInput from "../SearchInput";
import ViewSettings from "../ViewSettings";

export default function Navigation() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  return (
    <>
      <NavBar setOpen={setOpen} />
      <SideBar openSearch={openSearch} setOpenSearch={setOpenSearch} openSettings={openSettings} setOpenSettings={setOpenSettings} />
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
          <SearchInput modal={true} />
        </ModalSearch>
      ) : null}
      {openSettings ? (
        <ModalSettings setOpenSettings={setOpenSettings}>
          <ViewSettings />
        </ModalSettings>
      ) : null}
    </>
  );
}
