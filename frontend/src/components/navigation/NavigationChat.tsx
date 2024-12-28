import React from "react";

import SettingsModal from "../modals/SettingsModal";
import BottomBarChat from "./BottomBarChat";
import TopBarChat from "./TopBarChat";
import SideBarChat from "./SideBarChat";
import SearchModal from "../modals/SearchModal";
import SearchInput from "../SearchInput";
import MobileSettingsModal from "../modals/MobileSettingsModal";
import ViewSettings from "../ViewSettings";
import AddMemberModal from "../modals/AddMemberModal";
import FormProtected from "../FormProtected";
import { Modal, ModalBody, ModalHeader } from "../modals/Modals";
import MembersModal from "../modals/MembersModal";
import CreateChannelModal from "../modals/CreateChannelModal";

import { StateMssages } from "../../pages/Chat/Chat";

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
  const { click } = React.useContext(StateMssages);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    React.useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = React.useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = React.useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const [isMobileSettingsModalOpen, setIsMobileSettingsModalOpen] =
    React.useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);

  return (
    <>
      <TopBarChat
        openSettingsModal={() => setIsSettingsModalOpen(true)}
        openMembersModal={() => setIsMembersModalOpen(true)}
        openAddMemberModal={() => setIsAddMemberModalOpen(true)}
      />

      <SideBarChat
        openPasswordModal={() => setIsPasswordModalOpen(true)}
        openCreateChannelModal={() => setIsCreateChannelModalOpen(true)}
        closeSearchModal={() => setIsSearchModalOpen(false)}
        closeMobileSettingsModal={() => setIsMobileSettingsModalOpen(false)}
      />

      {!click && (
        <BottomBarChat
          isSearchModalOpen={isSearchModalOpen}
          openSearchModal={() => setIsSearchModalOpen(true)}
          closeSearchModal={() => setIsSearchModalOpen(false)}
          isMobileSettingsModalOpen={isMobileSettingsModalOpen}
          openMobileSettingsModal={() => setIsMobileSettingsModalOpen(true)}
          closeMobileSettingsModal={() => setIsMobileSettingsModalOpen(false)}
        />
      )}

      {isSettingsModalOpen && (
        <Modal className="h-[34rem] w-[90%] lg:h-[21.5rem] lg:w-[40rem]">
          <ModalHeader closeModal={() => setIsSettingsModalOpen(false)}>
            Settings
          </ModalHeader>
          <ModalBody className="justify-center">
            <SettingsModal closeModal={() => setIsSettingsModalOpen(false)} />
          </ModalBody>
        </Modal>
      )}

      {isSearchModalOpen && (
        <SearchModal closeModal={() => setIsSearchModalOpen(false)}>
          <SearchInput modal={true} />
        </SearchModal>
      )}

      {isMobileSettingsModalOpen && (
        <MobileSettingsModal
          closeModal={() => setIsMobileSettingsModalOpen(false)}
        >
          <ViewSettings openModal={() => setIsSettingsModalOpen(true)} />
        </MobileSettingsModal>
      )}

      {isCreateChannelModalOpen && (
        <Modal className="h-[40rem] w-[90%] lg:h-[21.5rem] lg:w-[40rem]">
          <ModalHeader closeModal={() => setIsCreateChannelModalOpen(false)}>
            Create channel
          </ModalHeader>
          <ModalBody className="justify-center">
            <CreateChannelModal
              closeModal={() => setIsCreateChannelModalOpen(false)}
            />
          </ModalBody>
        </Modal>
      )}

      {isAddMemberModalOpen && (
        <Modal className="h-auto w-[90%] px-0 lg:w-[40rem]">
          <ModalHeader
            closeModal={() => setIsAddMemberModalOpen(false)}
            className="px-4"
          >
            Add member
          </ModalHeader>
          <ModalBody className="justify-center">
            <AddMemberModal />
          </ModalBody>
        </Modal>
      )}

      {isMembersModalOpen && (
        <Modal className="h-auto w-[90%] px-0 lg:w-[40rem]">
          <ModalHeader
            closeModal={() => setIsMembersModalOpen(false)}
            className="px-4"
          >
            Members
          </ModalHeader>
          <ModalBody className="justify-center">
            <MembersModal />
          </ModalBody>
        </Modal>
      )}

      {isPasswordModalOpen && (
        <Modal className="h-[15rem] w-[90%] lg:h-[15rem] lg:w-[40rem]">
          <ModalHeader closeModal={() => setIsPasswordModalOpen(false)}>
            Password
          </ModalHeader>
          <ModalBody className="justify-center">
            <FormProtected closeModal={() => setIsPasswordModalOpen(false)} />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

export default NavigationChat;
