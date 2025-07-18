import React from "react";

import { GroupIcon, PlusIcon } from "./Icons";
import ArrowLeftButton from "./buttons/ArrowLeftButton/ArrowLeftButton";
import VisuallyHidden from "./VisuallyHidden";
import Modal from "./Modal/Modal";
import MembersModal from "./modals/MembersModal";
import useToggle from "../hooks/use-toggle";
import { UserType } from "../api/types";
import AddMemberModal from "./modals/AddMemberModal";
import { ChannelType, UserRole } from "../pages/Chat/types";

interface PropsType {
  channelId: string;
  channelName: string;
  channelType: ChannelType;
  loggedUserRole: UserRole;
  loggedUserData: UserType;
  handleArrowLeftClick: () => void;
}

function ChannelEditCard({
  channelId,
  channelName,
  channelType,
  loggedUserRole,
  loggedUserData,
  handleArrowLeftClick,
}: PropsType) {
  const [isMembersModalOpen, toggleIsMembersModalOpen] = useToggle(false);
  const [isAddMemberModalOpen, toggleIsAddMemberModalOpen] = useToggle(false);

  return (
    <>
      {isMembersModalOpen && (
        <Modal title="members" handleDismiss={toggleIsMembersModalOpen}>
          <MembersModal
            channelId={channelId}
            loggedUserRole={loggedUserRole}
            loggedUserData={loggedUserData}
          />
        </Modal>
      )}

      {isAddMemberModalOpen && (
        <Modal title="add member" handleDismiss={toggleIsAddMemberModalOpen}>
          <AddMemberModal channelId={channelId} channelType={channelType} />
        </Modal>
      )}

      <div className="flex flex-1 items-center gap-4">
        <ArrowLeftButton onClick={handleArrowLeftClick} />

        <div className="flex w-full items-center gap-2">
          <div className="flex w-full items-center justify-between lg:justify-start lg:gap-4">
            <span className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap text-[1.1rem] capitalize text-primaryText">
              {channelName}
            </span>
            <div className="flex items-center gap-4">
              {(loggedUserRole === "OWNER" || loggedUserRole === "ADMIN") &&
                channelType !== "PROTECTED" && (
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover"
                    onClick={toggleIsAddMemberModalOpen}
                  >
                    <PlusIcon edit="fill-secondaryText w-4 h-4" />
                    <VisuallyHidden>
                      Open a modal to add friends to the channel
                    </VisuallyHidden>
                  </button>
                )}
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover"
                onClick={toggleIsMembersModalOpen}
              >
                <GroupIcon edit="fill-secondaryText w-5 h-5" />
                <VisuallyHidden>
                  Open a modal to show the members
                </VisuallyHidden>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelEditCard;
