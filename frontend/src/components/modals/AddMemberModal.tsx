import React from "react";

import FriendCard from "../FriendCard";
import { ExclamationIcon } from "../Icons";
import Spinner from "../Spinner";
import { addMember, useChannelNonMemberFriends } from "../../api/API";

import { ChannelType } from "../../pages/Chat/types";

function AddMemberModal({ chatDataBox }: { chatDataBox: ChannelType }) {
  const [isLoading, nonMemberFriends, setNonMemberFriends] =
    useChannelNonMemberFriends(chatDataBox.id);

  async function handleAddMember(userId: string, index: number) {
    await addMember({
      channelId: chatDataBox.id,
      channelType: chatDataBox.type,
      userId,
    });

    const nextNonMemberFriends = [...nonMemberFriends];
    nextNonMemberFriends.splice(index, 1);
    setNonMemberFriends(nextNonMemberFriends);
  }

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <Spinner size={36} />
      </div>
    );
  }

  if (!nonMemberFriends.length) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <ExclamationIcon edit="w-5 h-4 fill-secondaryText" />
        No friends available to add.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 pt-5">
      <div className="flex max-h-[34rem] flex-col overflow-auto">
        <div className="flex flex-col gap-6">
          {nonMemberFriends.map((nonMemberFriend, index) => {
            return (
              <FriendCard
                key={nonMemberFriend.id}
                nonMemberFriend={nonMemberFriend}
                handleAddMember={() =>
                  handleAddMember(nonMemberFriend.id, index)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
