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
import CreateChannel from "../Modals/CreateChannel";
import AddMember from "../Modals/AddMember";
import Members from "../Modals/Members";
import FormProtected from "../FormProtected";
import { MessagesContext } from "../Routes/Messages";

export default function NavigationChat() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [createChannel, setCreateChannel] = useState<boolean>(false);
  const [addMember, setAddMember] = useState<boolean>(false);
  const [members, setMembers] = useState<boolean>(false);
  const stateMessages = useContext(StateMssages);
  const messageData = useContext(MessagesContext);

  return (
    <>
      <NavBarChat
        setOpen={setOpen}
        setAddMember={setAddMember}
        setMembers={setMembers}
      />
      <SideBarChat
        setOpenSearch={setOpenSearch}
        setOpenSettings={setOpenSettings}
        setCreateChannel={setCreateChannel}
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

      {createChannel ? (
        <Modal edit="w-[90%] h-[40rem] lg:w-[40rem] lg:h-[21.5rem]">
          <ModalHeader setOpen={setCreateChannel}>Create channel</ModalHeader>
          <ModalBody edit="justify-center">
            <CreateChannel setCreateChannel={setCreateChannel} />
          </ModalBody>
        </Modal>
      ) : null}
      {addMember ? (
        <Modal edit="h-auto w-[90%] lg:w-[40rem] px-0">
          <ModalHeader setOpen={setAddMember} edit="px-4">
            Add member
          </ModalHeader>
          <ModalBody edit="justify-center">
            <AddMember />
          </ModalBody>
        </Modal>
      ) : null}

      {members ? (
        <Modal edit="h-auto w-[90%] lg:w-[40rem] px-0">
          <ModalHeader setOpen={setMembers} edit="px-4">
            Members
          </ModalHeader>
          <ModalBody edit="justify-center">
            <Members />
          </ModalBody>
        </Modal>
      ) : null}
      {messageData.passwordProtected ? (
        <Modal edit="w-[90%] h-[15rem] lg:w-[40rem] lg:h-[15rem]">
          <ModalHeader setOpen={setCreateChannel}>Password</ModalHeader>
          <ModalBody edit="justify-center">
            <FormProtected />
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
}
