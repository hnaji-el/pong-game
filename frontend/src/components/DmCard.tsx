import React from "react";

import { Link } from "react-router-dom";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { PointsIcon } from "./Icons";

import { blockFriend, getAllDms } from "../api/API";

import { DmType } from "../pages/Messages/types";

import { globalSocket } from "../utilities/socket";
import { StateMssages } from "../pages/Messages/Messages";
import { MessagesContext } from "../pages/Messages/Messages";

function DmCard({ data, index }: { data: DmType; index: number }) {
  const stateMessages = React.useContext(StateMssages);
  const messageData = React.useContext(MessagesContext);

  return (
    <div
      className={`flex border-b-[1px] border-b-backgroundHover px-3 last:border-b-0 hover:bg-backgroundHover lg:px-2 ${
        index === messageData.dmIndex ? "bg-backgroundHover" : ""
      }`}
    >
      <Link
        to=""
        className="flex flex-1 justify-between py-4"
        onClick={() => {
          messageData.setDmIndex(index);
          stateMessages.setClick(true);
          messageData.setChatDataBox(messageData.dms[index]);
          messageData.setIsDmOrChannel("DM");
        }}
      >
        <div className="flex items-center gap-2">
          <img
            src={data.picture}
            alt="friend picture"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText">
                {data.username}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <span className="flex items-center justify-center">
        <Menu>
          <MenuButton className="group flex items-center justify-center rounded-full p-0">
            <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
          </MenuButton>
          <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
              onClick={() => {
                globalSocket.emit("inviteToPlay", {
                  sender: stateMessages.settings,
                  receiverId: data.id,
                });
              }}
            >
              Invite to play
            </MenuItem>
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
              onClick={async () => {
                await blockFriend(data.id);
                getAllDms((res: any) => {
                  messageData.setDms(res);
                });
              }}
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
