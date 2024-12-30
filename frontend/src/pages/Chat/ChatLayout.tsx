import React from "react";

import SettingsModal from "../../components/modals/SettingsModal";
import FooterBar from "./FooterBar";
import HeaderBar from "./HeaderBar";
import SideNavBar from "./SideNavBar";
import SearchModal from "../../components/modals/SearchModal";
import SearchInput from "../../components/SearchInput";
import MobileSettingsModal from "../../components/modals/MobileSettingsModal";
import ViewSettings from "../../components/ViewSettings";
import AddMemberModal from "../../components/modals/AddMemberModal";
import FormProtected from "../../components/FormProtected";
import { Modal, ModalBody, ModalHeader } from "../../components/modals/Modals";
import MembersModal from "../../components/modals/MembersModal";
import CreateChannelModal from "../../components/modals/CreateChannelModal";

import { StateMssages } from "./Chat";

/*
 * ChatLayout
 *  |— HeaderBar
 *  |— SideNavBar
 *  |—  |— DmCardList
 *  |—  |—  |— DmCard[]
 *  |—  |— ChannelCardList
 *  |—  |—  |— ChannelCard[]
 */

function ChatLayout({ children }: { children?: JSX.Element }) {
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
      <div
        className={`mx-[12px] h-full w-auto flex-col pb-[12px] pt-[28px] lg:ml-[252px] ${click ? "flex" : "hidden"} lg:flex`}
      >
        <HeaderBar
          openSettingsModal={() => setIsSettingsModalOpen(true)}
          openMembersModal={() => setIsMembersModalOpen(true)}
          openAddMemberModal={() => setIsAddMemberModalOpen(true)}
        />

        {children}
      </div>

      <SideNavBar
        openPasswordModal={() => setIsPasswordModalOpen(true)}
        openCreateChannelModal={() => setIsCreateChannelModalOpen(true)}
        closeSearchModal={() => setIsSearchModalOpen(false)}
        closeMobileSettingsModal={() => setIsMobileSettingsModalOpen(false)}
      />

      <FooterBar
        isSearchModalOpen={isSearchModalOpen}
        openSearchModal={() => setIsSearchModalOpen(true)}
        closeSearchModal={() => setIsSearchModalOpen(false)}
        isMobileSettingsModalOpen={isMobileSettingsModalOpen}
        openMobileSettingsModal={() => setIsMobileSettingsModalOpen(true)}
        closeMobileSettingsModal={() => setIsMobileSettingsModalOpen(false)}
      />

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

export default ChatLayout;
