import React from "react";

import SettingsBody from "../modals/settings/SettingsBody";
import PhoneNav from "./PhoneNav";
import TopBarChat from "./TopBarChat";
import SideBarChat from "./SideBarChat";
import ModalSearch from "../modals/ModalSearch";
import SearchInput from "../SearchInput";
import ModalSettings from "../modals/ModalSettings";
import ViewSettings from "../ViewSettings";
import CreateChannel from "../modals/CreateChannel";
import AddMember from "../modals/AddMember";
import Members from "../modals/Members";
import FormProtected from "../FormProtected";
import { Modal, ModalBody, ModalHeader } from "../modals/Modals";

import { StateMssages } from "../../pages/Messages/Messages";
import { MessagesContext } from "../../pages/Messages/Messages";

/*
 * NavigationCaht
 *  |— TopBarChat
 *  |— SideBarChat
 *      |— Dms
 *      |— Channels
 */

function NavigationChat() {
  const [open, setOpen] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [createChannel, setCreateChannel] = React.useState(false);
  const [addMember, setAddMember] = React.useState(false);
  const [members, setMembers] = React.useState(false);

  const stateMessages = React.useContext(StateMssages);
  const messageData = React.useContext(MessagesContext);

  return (
    <>
      <TopBarChat
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

export default NavigationChat;
