import React from "react";

import VisuallyHidden from "./VisuallyHidden";
import StatusTag from "./StatusTag";
import { PlusIcon } from "./Icons";

import { MemberType } from "../pages/Chat/types";

interface PropsType {
  nonMemberFriend: MemberType;
  handleAddMember: () => void;
}

function FriendCard({ nonMemberFriend, handleAddMember }: PropsType) {
  return (
    <div className={`flex flex-1 items-center justify-between gap-0.5 px-4`}>
      <div className="flex items-center gap-2">
        <img
          src={nonMemberFriend.pictureURL}
          alt="avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span className="text-md name-member overflow-hidden text-ellipsis whitespace-nowrap text-primaryText">
              {nonMemberFriend.nickname}
            </span>
          </div>
          <StatusTag isOnline={nonMemberFriend.status === "online"} />
        </div>
      </div>

      <button
        className="flex h-7 w-7 items-center justify-center rounded-full bg-body p-1"
        onClick={handleAddMember}
      >
        <PlusIcon edit="fill-secondaryText w-3 h-3" />
        <VisuallyHidden>Add Member</VisuallyHidden>
      </button>
    </div>
  );
}

export default FriendCard;
