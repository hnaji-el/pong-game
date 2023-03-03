import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Modal, ModalBody, ModalHeader } from "../Modals/Modals";
import ModalSearch from "../Modals/ModalSearch";
import SettingsBody from "../Modals/Settings/SettingsBody";
import SearchInput from "../SearchInput";

export default function Navigation() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <>
      <NavBar setOpen={setOpen} />
      <SideBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
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
          <button className="bg-green-200">hello</button>
        </ModalSearch>
      ) : null}
    </>
  );
}
