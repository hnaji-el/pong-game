import React from "react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { LockIcon, PointsIcon } from "./Icons";
import VisuallyHidden from "./VisuallyHidden";

interface PropsType {
  title: string;
  isLabeled: boolean;
  isHovered: boolean;
  isJoined: boolean;
  isOwner: boolean;
  isProtected: boolean;
  handleCardClick: () => void;
  handleDeleteClick: () => void;
  handleLeaveClick: () => void;
}

function ChannelCard({
  title,
  isLabeled,
  isHovered,
  isJoined,
  isOwner,
  isProtected,
  handleCardClick,
  handleDeleteClick,
  handleLeaveClick,
}: PropsType) {
  return (
    <div
      className={`flex border-b-[1px] border-b-backgroundHover px-3 hover:bg-backgroundHover lg:px-2 ${
        isHovered ? "bg-backgroundHover" : ""
      }`}
    >
      <button
        className="flex flex-1 items-start justify-between py-4"
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-2">
          <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize text-primaryText">
            {title}
          </span>
        </div>
        {isLabeled && (
          <div className="relative right-2 top-[.2rem] z-[-1] w-12 rounded-full bg-primary text-center text-[.6rem] font-light capitalize text-primaryText">
            private
          </div>
        )}
        <VisuallyHidden>Open the conversation</VisuallyHidden>
      </button>

      {isJoined && (
        <Menu>
          <MenuButton className="group flex items-center justify-center rounded-full p-0">
            <PointsIcon edit="w-3 h-3 fill-secondaryText" />
            <VisuallyHidden>Show more actions</VisuallyHidden>
          </MenuButton>
          <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
            {isOwner && (
              <MenuItem
                className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
                onClick={handleDeleteClick}
              >
                delete
              </MenuItem>
            )}
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
              onClick={handleLeaveClick}
            >
              leave
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      {!isJoined && isProtected && (
        <div className="flex items-center justify-center">
          <LockIcon edit="w-4 h-4 fill-secondaryText" />
          <VisuallyHidden>Locked Icon</VisuallyHidden>
        </div>
      )}
    </div>
  );
}

export default ChannelCard;
