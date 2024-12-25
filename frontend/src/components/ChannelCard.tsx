import React from "react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { LockIcon, PointsIcon } from "./Icons";
import { deleteRoom, getAllChannels, joinRoom, leaveRoom } from "../api/API";
import { ChannelType } from "../pages/Messages/types";

import { MessagesContext, StateMssages } from "../pages/Messages/Messages";

interface PropsType {
  title: string;
  isLabeled: boolean;
  index: number;
  data: any;
}

function ChannelCard({ title, isLabeled, index, data }: PropsType) {
  const { setClick } = React.useContext(StateMssages);
  const {
    dmIndex,
    setDmIndex,
    channelIndex,
    setChannelIndex,
    setIsDmOrChannel,
    setChatDataBox,
    channels,
    setChannels,
    setpasswordProtected,
  } = React.useContext(MessagesContext);

  function handleCardClick() {
    if (data.isJoined) {
      setClick(true);
      setChannelIndex(index);
      setIsDmOrChannel("CHANNEL");
      setDmIndex(-1);
      setChatDataBox(channels[index]);
    }

    if (!data.isJoined && data.type === "PROTECTED") {
      setChannelIndex(index);
      setpasswordProtected(true);
    }

    if (!data.isJoined && data.type === "PUBLIC") {
      joinRoom(
        (res: any) => {
          setClick(true);
          setChannelIndex(index);
          setIsDmOrChannel("CHANNEL");
          setDmIndex(-1);
          setChatDataBox(res);
          getAllChannels((response: any) => {
            setChannels(response);
          });
        },
        {
          name: data.name,
          type: "PUBLIC",
        },
      );
    }
  }

  async function handleDeleteClick() {
    await deleteRoom(data.name);
    getAllChannels((res: ChannelType[]) => {
      setChannels(res);
    });
  }

  async function handleLeaveClick() {
    await leaveRoom(data.name);
    getAllChannels((res: ChannelType[]) => {
      setChannels(res);
    });
  }

  return (
    <div
      className={`flex border-b-[1px] border-b-backgroundHover px-3 last:border-b-0 hover:bg-backgroundHover lg:px-2 ${
        dmIndex === -1 && index === channelIndex ? "bg-backgroundHover" : ""
      }`}
    >
      <button
        className="flex flex-1 items-start justify-between py-4"
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize text-primaryText">
                {title}
              </span>
            </div>
          </div>
        </div>
        {isLabeled && (
          <div className="p-.6 relative right-2 top-[.2rem] z-[-1] w-12 rounded-full bg-primary text-center text-[.6rem] font-light capitalize text-primaryText">
            private
          </div>
        )}
      </button>
      {data.isJoined && (
        <span className="flex items-center justify-center">
          <Menu>
            <MenuButton className="group flex items-center justify-center rounded-full p-0">
              <PointsIcon edit="w-3 h-3 fill-secondaryText" />
            </MenuButton>
            <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
              {data.role === "OWNER" && (
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
        </span>
      )}
      {!data.isJoined && data.type === "PROTECTED" && (
        <div className="flex items-center justify-center">
          <LockIcon edit="w-4 h-4 fill-secondaryText" />
        </div>
      )}
    </div>
  );
}

export default ChannelCard;
