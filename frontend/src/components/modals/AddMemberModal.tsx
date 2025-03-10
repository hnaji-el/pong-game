import React from "react";

import FriendCard from "../FriendCard";
import { ExclamationIcon } from "../Icons";
import Spinner from "../Spinner";
import { addMember, useChannelNonMemberFriends } from "../../api/API";

interface PropsType {
  channelId: string;
  channelType: string;
}

function AddMemberModal({ channelId, channelType }: PropsType) {
  const [isLoading, nonMemberFriends, setNonMemberFriends] =
    useChannelNonMemberFriends(channelId);

  async function handleAddMember(userId: string, index: number) {
    await addMember({
      channelId: channelId,
      channelType: channelType,
      userId,
    });

    const nextNonMemberFriends = [...nonMemberFriends];
    nextNonMemberFriends.splice(index, 1);
    setNonMemberFriends(nextNonMemberFriends);
  }

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center p-8 pb-[1rem] text-sm text-secondaryText lg:w-[640px]">
        <Spinner size={36} />
      </div>
    );
  }

  if (!nonMemberFriends.length) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText lg:w-[640px]">
        <ExclamationIcon edit="w-[20px] h-[20px] min-w-[20px] min-h-[20px] fill-secondaryText" />
        No friends available to add.
      </div>
    );
  }

  return (
    <div className="flex max-h-[400px] w-full flex-col gap-6 overflow-auto pt-5 lg:w-[640px]">
      {nonMemberFriends.map((nonMemberFriend, index) => (
        <FriendCard
          key={nonMemberFriend.id}
          nonMemberFriend={nonMemberFriend}
          handleAddMember={() => handleAddMember(nonMemberFriend.id, index)}
        />
      ))}
    </div>
  );
}

export default AddMemberModal;
