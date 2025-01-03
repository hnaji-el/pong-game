import React from "react";

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { PointsIcon } from "./Icons";
import {
  getMembersChannel,
  setAdmin,
  blockMember,
  kickMember,
} from "../api/API";

import { globalSocket } from "../utilities/socket";
import { MemberType } from "../pages/Chat/types";
import { UserType } from "../api/types";

interface PropsType {
  member: MemberType;
  setMembers: React.Dispatch<React.SetStateAction<any>>;
  channelId: string;
  channelName: string;
  channelUserRole: string;
  userData: UserType;
}

function MemberCard({
  member,
  setMembers,
  channelId,
  channelName,
  channelUserRole,
  userData,
}: PropsType) {
  function handleInviteToPlay() {
    globalSocket.emit("inviteToPlay", {
      sender: userData,
      receiverId: member.id,
    });
  }

  async function handleSetAdmin() {
    await setAdmin({
      channelId,
      userId: member.id,
    });
    getMembersChannel((members) => {
      setMembers(members);
    }, channelName);
  }

  async function handleBlockMember() {
    await blockMember({
      channelId,
      userId: member.id,
    });
    getMembersChannel((members) => {
      setMembers(members);
    }, channelName);
  }

  async function handleKickMember() {
    await kickMember({
      channelId: channelId,
      userId: member.id,
    });
    getMembersChannel((members) => {
      setMembers(members);
    }, channelName);
  }

  return (
    <div className={`flex flex-1 items-center justify-between gap-0.5 px-4`}>
      <div className="flex items-center gap-2">
        <img
          src={member.pictureURL}
          alt="Profile"
          className="h-[48px] w-[48px] rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span
              className={`text-md name-member overflow-hidden text-ellipsis whitespace-nowrap text-primaryText`}
            >
              {member.nickname}
            </span>
            {member.role !== "MEMBER" && (
              <span
                className={`flex w-16 items-center justify-center rounded-sm text-xs capitalize ${
                  member.role === "OWNER"
                    ? "bg-ownerBg text-ownerText"
                    : member.role === "ADMIN"
                      ? "bg-adminBg text-adminText"
                      : ""
                }`}
              >
                {member.role}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                member.status === "offline" ? "bg-offline" : "bg-online"
              }`}
            ></span>
            <span className="text-sm font-light capitalize text-secondaryText">
              {member.status === "offline" ? "offline" : "online"}
            </span>
          </div>
        </div>
      </div>

      <Menu>
        <MenuButton className="flex h-7 w-7 items-center justify-center rounded-full bg-body p-1">
          <PointsIcon edit="fill-secondaryText w-3 h-3 mx-auto" />
        </MenuButton>

        <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
          <MenuItem
            className="flex items-center gap-2 px-3 py-2 font-light capitalize hover:bg-backgroundHover"
            onClick={handleInviteToPlay}
          >
            invite to play
          </MenuItem>
          {channelUserRole === "OWNER" && member.role === "MEMBER" && (
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
              onClick={handleSetAdmin}
            >
              set to admin
            </MenuItem>
          )}
          {(channelUserRole === "OWNER" ||
            (channelUserRole === "ADMIN" && member.role === "MEMBER")) && (
            <>
              <MenuItem
                className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
                onClick={handleBlockMember}
              >
                block
              </MenuItem>
              <MenuItem
                className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
                onClick={handleKickMember}
              >
                kick
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </div>
  );
}

export default MemberCard;
