import React from "react";

import { GroupIcon, PlusIcon } from "./Icons";
import ArrowLeftButton from "./ArrowLeftButton";

interface PropsType {
  name: string;
  type: string;
  userRole: string;
  onClick: () => void;
  openMembersModal: () => void;
  openAddMemberModal: () => void;
}

function ChannelEditCard({
  name,
  type,
  userRole,
  onClick,
  openMembersModal,
  openAddMemberModal,
}: PropsType) {
  return (
    <div className="flex flex-1 items-center gap-4">
      <ArrowLeftButton onClick={onClick} />
      <div className="flex w-full items-center gap-2">
        <div className="flex w-full items-center justify-between lg:justify-start lg:gap-4">
          <span className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap text-[1.1rem] capitalize text-primaryText">
            {name}
          </span>
          <div className="flex items-center gap-4">
            {userRole !== "MEMBER" && type !== "PROTECTED" && (
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover"
                onClick={openAddMemberModal}
              >
                <PlusIcon edit="fill-secondaryText w-4 h-4" />
              </button>
            )}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover"
              onClick={openMembersModal}
            >
              <GroupIcon edit="fill-secondaryText w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelEditCard;
