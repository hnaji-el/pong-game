import React from "react";

import VisuallyHidden from "./VisuallyHidden";
import RoleTag from "./RoleTag";
import { PointsIcon } from "./Icons";

import { MemberType } from "../pages/Chat/types";
import StatusTag from "./StatusTag";
import Dropdown from "./Dropdown/Dropdown";
import useToggle from "../hooks/use-toggle";

interface PropsType {
  member: MemberType;
  loggedUserRole: string;
  handleInviteToPlay: () => void;
  handleSetAdmin: () => void;
  handleBlockMember: () => void;
  handleUnblockMember: () => void;
  handleKickMember: () => void;
}

function MemberCard({
  member,
  loggedUserRole,
  handleInviteToPlay,
  handleSetAdmin,
  handleBlockMember,
  handleUnblockMember,
  handleKickMember,
}: PropsType) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);

  const options = [];

  if (member.role === "BLOCKED") {
    if (loggedUserRole === "OWNER" || loggedUserRole === "ADMIN") {
      options.push({ label: "unblock" });
    }
  } else {
    options.push({ label: "invite to play" });

    if (loggedUserRole === "OWNER" && member.role === "MEMBER") {
      options.push({ label: "set to admin" });
    }

    if (
      loggedUserRole === "OWNER" ||
      (loggedUserRole === "ADMIN" && member.role === "MEMBER")
    ) {
      options.push({ label: "block" }, { label: "kick" });
    }
  }

  function handleSelect(option: string) {
    if (option === "invite to play") handleInviteToPlay();
    if (option === "set to admin") handleSetAdmin();
    if (option === "block") handleBlockMember();
    if (option === "unblock") handleUnblockMember();
    if (option === "kick") handleKickMember();
  }

  return (
    <div className={`flex flex-1 items-center justify-between gap-0.5`}>
      <div className="flex items-center gap-2">
        <img
          src={member.pictureURL}
          alt="avatar"
          className="h-[48px] w-[48px] rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span
              className={`text-md name-member overflow-hidden text-ellipsis whitespace-nowrap text-primaryText`}
            >
              {member.nickname}
            </span>
            <RoleTag role={member.role} />
          </div>
          <StatusTag isOnline={member.status === "online"} />
        </div>
      </div>

      {options.length > 0 && (
        <Dropdown
          className="right-0 top-full translate-y-[8px]"
          isOpen={isDropdownOpen}
          toggleIsOpen={toggleIsDropdownOpen}
          options={options}
          handleSelect={handleSelect}
        >
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-body p-1"
            onClick={toggleIsDropdownOpen}
          >
            <PointsIcon edit="w-3 h-3 fill-secondaryText" />
            <VisuallyHidden>Show more actions</VisuallyHidden>
          </button>
        </Dropdown>
      )}
    </div>
  );
}

export default MemberCard;
