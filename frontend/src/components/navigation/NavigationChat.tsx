import React from "react";

import { Modal, ModalBody, ModalHeader } from "../modals/Modals";
import SettingsBody from "../modals/settings/SettingsBody";
import PhoneNav from "./PhoneNav";
import NavBarChat from "./NavBarChat";
import SideBarChat from "./SideBarChat";
import ModalSearch from "../modals/ModalSearch";
import SearchInput from "../SearchInput";
import ModalSettings from "../modals/ModalSettings";
import ViewSettings from "../ViewSettings";
import { StateMssages } from "../../pages/Messages";
import CreateChannel from "../modals/CreateChannel";
import AddMember from "../modals/AddMember";
import Members from "../modals/Members";
import FormProtected from "../FormProtected";
import { MessagesContext } from "../../pages/Messages";

export default function NavigationChat() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  const [createChannel, setCreateChannel] = React.useState<boolean>(false);
  const [addMember, setAddMember] = React.useState<boolean>(false);
  const [members, setMembers] = React.useState<boolean>(false);
  const stateMessages = React.useContext(StateMssages);
  const messageData = React.useContext(MessagesContext);

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
          <ModalHeader setOpen={messageData.setpasswordProtected}>
            Password
          </ModalHeader>
          <ModalBody edit="justify-center">
            <FormProtected />
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
}
