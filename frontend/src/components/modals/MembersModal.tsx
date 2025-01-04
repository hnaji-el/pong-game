import React from "react";

import { ExclamationIcon } from "../Icons";
import Spinner from "../Spinner";
import {
  useChannelMembers,
  setAdmin,
  blockMember,
  kickMember,
} from "../../api/API";

import { ChannelType, MemberType } from "../../pages/Chat/types";
import MemberCard from "../MemberCard";
import { UserType } from "../../api/types";
import { globalSocket } from "../../utilities/socket";

interface PropsType {
  chatDataBox: ChannelType;
  userData: UserType;
}

function MembersModal({ chatDataBox, userData }: PropsType) {
  const [isLoading, members, setMembers] = useChannelMembers(chatDataBox.id);

  function handleInviteToPlay(memberId: string) {
    globalSocket.emit("inviteToPlay", {
      sender: userData,
      receiverId: memberId,
    });
  }

  async function handleSetAdmin(memberId: string, index: number) {
    await setAdmin({
      channelId: chatDataBox.id,
      memberId,
    });

    const newMembers = [...members];
    newMembers[index].role = "ADMIN";
    setMembers(newMembers);
  }

  async function handleBlockMember(memberId: string, index: number) {
    await blockMember({
      channelId: chatDataBox.id,
      memberId,
    });

    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  }

  async function handleKickMember(memberId: string, index: number) {
    await kickMember({
      channelId: chatDataBox.id,
      memberId,
    });

    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  }

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <Spinner size={36} />
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <ExclamationIcon edit="w-5 h-4 fill-secondaryText relative top-[.1rem]" />
        You are the only one in this room.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 pt-5">
      <div
        className={`flex max-h-[34rem] flex-col overflow-auto ${
          members.length > 4 ? "relative" : ""
        }`}
      >
        <div className="flex flex-col gap-6">
          {members.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              channelUserRole={chatDataBox.role}
              handleInviteToPlay={() => handleInviteToPlay(member.id)}
              handleSetAdmin={() => handleSetAdmin(member.id, index)}
              handleBlockMember={() => handleBlockMember(member.id, index)}
              handleKickMember={() => handleKickMember(member.id, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembersModal;
