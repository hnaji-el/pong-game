import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../Modals/Modals";
import SettingsBody from "../Modals/Settings/SettingsBody";
import PhoneNav from "./PhoneNav";
import NavBarChat from "./NavBarChat";
import SideBarChat from "./SideBarChat";

export default function NavigationChat() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  return (
    <>
      <SideBarChat
        setOpenSearch={setOpenSearch}
        setOpenSettings={setOpenSettings}
      />
      <PhoneNav
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
    </>
  );
}
