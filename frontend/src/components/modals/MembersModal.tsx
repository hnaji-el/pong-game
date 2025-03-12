import React from "react";

import MemberCard from "../MemberCard";
import { ExclamationIcon } from "../Icons";
import Spinner from "../Spinner";
import {
  useChannelMembers,
  setAdmin,
  blockMember,
  kickMember,
  unblockMember,
} from "../../api/API";

import { UserType } from "../../api/types";
import { globalSocket } from "../../utilities/socket";
import { UserRole } from "../../pages/Chat/types";

interface PropsType {
  channelId: string;
  loggedUserRole: UserRole;
  loggedUserData: UserType;
}

function MembersModal({
  channelId,
  loggedUserRole,
  loggedUserData,
}: PropsType) {
  const [isLoading, members, setMembers] = useChannelMembers(channelId);

  function handleInviteToPlay(memberId: string) {
    globalSocket.emit("inviteToPlay", {
      sender: loggedUserData,
      receiverId: memberId,
    });
  }

  async function handleSetAdmin(memberId: string, index: number) {
    await setAdmin({
      channelId: channelId,
      memberId,
    });

    const nextMembers = [...members];
    nextMembers[index].role = "ADMIN";
    setMembers(nextMembers);
  }

  async function handleBlockMember(memberId: string, index: number) {
    await blockMember({
      channelId: channelId,
      memberId,
    });

    const nextMembers = [...members];
    nextMembers[index].role = "BLOCKED";
    setMembers(nextMembers);
  }

  async function handleUnblockMember(memberId: string, index: number) {
    await unblockMember({
      channelId: channelId,
      memberId,
    });

    const nextMembers = [...members];
    nextMembers[index].role = "MEMBER";
    setMembers(nextMembers);
  }

  async function handleKickMember(memberId: string, index: number) {
    await kickMember({
      channelId: channelId,
      memberId,
    });

    const nextMembers = [...members];
    nextMembers.splice(index, 1);
    setMembers(nextMembers);
  }

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center p-8 pb-[1rem] text-sm text-secondaryText lg:w-[640px]">
        <Spinner size={36} />
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText lg:w-[640px]">
        <ExclamationIcon edit="w-[20px] h-[20px] min-w-[20px] min-h-[20px] fill-secondaryText" />
        You are the only one in this room.
      </div>
    );
  }

  return (
    <div className="flex max-h-[400px] w-full flex-col gap-6 pt-5 lg:w-[640px]">
      {members.map((member, index) => (
        <MemberCard
          key={member.id}
          member={member}
          loggedUserRole={loggedUserRole}
          handleInviteToPlay={() => handleInviteToPlay(member.id)}
          handleSetAdmin={() => handleSetAdmin(member.id, index)}
          handleBlockMember={() => handleBlockMember(member.id, index)}
          handleUnblockMember={() => handleUnblockMember(member.id, index)}
          handleKickMember={() => handleKickMember(member.id, index)}
        />
      ))}
    </div>
  );
}

export default MembersModal;
