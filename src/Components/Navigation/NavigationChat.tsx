import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../Modals/Modals";
import SettingsBody from "../Modals/Settings/SettingsBody";
import PhoneNav from "./PhoneNav";
import NavBarChat from "./NavBarChat";
import SideBarChat from "./SideBarChat";
import ModalSearch from "../Modals/ModalSearch";
import SearchInput from "../SearchInput";
import ModalSettings from "../Modals/ModalSettings";
import ViewSettings from "../ViewSettings";
import { StateMssages } from "../Routes/Messages";

export default function NavigationChat() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [createChannel, setCreateChannel] = useState<boolean>(false);
  const [addMember, setAddMember] = useState<boolean>(false);
  const [members, setMembers] = useState<boolean>(false);
  const [channelPassword, setChannelPassword] = useState<boolean>(false);
  const stateMessages = useContext(StateMssages);

  return (
    <>
      <NavBarChat setOpen={setOpen} />
      <SideBarChat
        setOpenSearch={setOpenSearch}
        setOpenSettings={setOpenSettings}
      />
      {!stateMessages.click ? (
        <PhoneNav
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
        />
      ) : null}
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
          <ViewSettings setOpen={setOpen} />
        </ModalSettings>
      ) : null}

      <Modal edit="w-[90%] h-[34rem] lg:w-[40rem] lg:h-[21.5rem]">
        <ModalHeader setOpen={setOpen}>Create channel</ModalHeader>
        <ModalBody edit="justify-center">
          create channel
        </ModalBody>
      </Modal>
    </>
  );
}
