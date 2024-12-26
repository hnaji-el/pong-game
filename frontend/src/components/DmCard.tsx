import React from "react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { PointsIcon } from "./Icons";

interface PropsType {
  avatar: string;
  title: string;
  isHovered: boolean;
  handleCardClick: () => void;
  handleInviteToPlayClick: () => void;
  handleBlockClick: () => void;
}

function DmCard({
  avatar,
  title,
  isHovered,
  handleCardClick,
  handleInviteToPlayClick,
  handleBlockClick,
}: PropsType) {
  return (
    <div
      className={`flex border-b-[1px] border-b-backgroundHover px-3 last:border-b-0 hover:bg-backgroundHover lg:px-2 ${
        isHovered ? "bg-backgroundHover" : ""
      }`}
    >
      <button
        className="flex flex-1 justify-between py-4"
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt="friend avatar"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex items-center gap-1.5">
            <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText">
              {title}
            </span>
          </div>
        </div>
      </button>

      <span className="flex items-center justify-center">
        <Menu>
          <MenuButton className="group flex items-center justify-center rounded-full p-0">
            <PointsIcon edit="w-3 h-3 fill-secondaryText" />
          </MenuButton>
          <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
              onClick={handleInviteToPlayClick}
            >
              invite to play
            </MenuItem>
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
              onClick={handleBlockClick}
            >
              block
            </MenuItem>
          </MenuList>
        </Menu>
      </span>
    </div>
  );
}

export default DmCard;
