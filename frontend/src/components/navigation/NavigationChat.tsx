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

import { StateMssages, MessagesContext } from "../../pages/Messages/Messages";

/*
 * NavigationChat
 *  |— TopBarChat
 *  |— SideBarChat
 *  |—  |— DmCardList
 *  |—  |—  |— DmCard[]
 *  |—  |— ChannelCardList
 *  |—  |—  |— ChannelCard[]
 */

function NavigationChat() {
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [addMember, setAddMember] = React.useState(false);
  const [members, setMembers] = React.useState(false);

  const { click } = React.useContext(StateMssages);
  const { passwordProtected, setpasswordProtected } =
    React.useContext(MessagesContext);

  return (
    <>
      <TopBarChat
        setOpen={setOpen}
        setAddMember={setAddMember}
        setMembers={setMembers}
      />

      <SideBarChat
        openCreateChannelModal={() => setIsCreateChannelModalOpen(true)}
        setOpenSearch={setOpenSearch}
        setOpenSettings={setOpenSettings}
      />

      {!click && (
        <PhoneNav
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
        />
      )}

      {open && (
        <Modal className="h-[34rem] w-[90%] lg:h-[21.5rem] lg:w-[40rem]">
          <ModalHeader closeModal={() => setOpen(false)}>Settings</ModalHeader>
          <ModalBody className="justify-center">
            <SettingsBody setOpen={setOpen} />
          </ModalBody>
        </Modal>
      )}

      {openSearch && (
        <ModalSearch setOpenSearch={setOpenSearch}>
          <SearchInput modal={true} />
        </ModalSearch>
      )}

      {openSettings && (
        <ModalSettings setOpenSettings={setOpenSettings}>
          <ViewSettings setOpen={setOpen} />
        </ModalSettings>
      )}

      {isCreateChannelModalOpen && (
        <Modal className="h-[40rem] w-[90%] lg:h-[21.5rem] lg:w-[40rem]">
          <ModalHeader closeModal={() => setIsCreateChannelModalOpen(false)}>
            Create channel
          </ModalHeader>
          <ModalBody className="justify-center">
            <CreateChannel
              closeModal={() => setIsCreateChannelModalOpen(false)}
            />
          </ModalBody>
        </Modal>
      )}

      {addMember && (
        <Modal className="h-auto w-[90%] px-0 lg:w-[40rem]">
          <ModalHeader closeModal={() => setAddMember(false)} className="px-4">
            Add member
          </ModalHeader>
          <ModalBody className="justify-center">
            <AddMember />
          </ModalBody>
        </Modal>
      )}

      {members && (
        <Modal className="h-auto w-[90%] px-0 lg:w-[40rem]">
          <ModalHeader closeModal={() => setMembers(false)} className="px-4">
            Members
          </ModalHeader>
          <ModalBody className="justify-center">
            <Members />
          </ModalBody>
        </Modal>
      )}

      {passwordProtected && (
        <Modal className="h-[15rem] w-[90%] lg:h-[15rem] lg:w-[40rem]">
          <ModalHeader closeModal={() => setpasswordProtected(false)}>
            Password
          </ModalHeader>
          <ModalBody className="justify-center">
            <FormProtected />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

export default NavigationChat;
