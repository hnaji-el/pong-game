import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Modal, ModalBody, ModalHeader } from "../Modals/Modals";
import SettingsBody from "../Modals/Settings/SettingsBody";

export default function Navigation() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <NavBar setOpen={setOpen} />
      <SideBar />
      {open ? (
        <Modal edit="w-[90%] h-[34rem] lg:w-[40rem] lg:h-[21.5rem]">
          <ModalHeader setOpen={setOpen}>Settings</ModalHeader>
          <ModalBody edit="justify-center"><SettingsBody setOpen={setOpen}/></ModalBody>
        </Modal>
      ) : null}
    </>
  );
}
