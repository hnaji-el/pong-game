import React from "react";
import { addFriend } from "../API";
import { AddFriendIcon } from "./Icons";

interface TypeProps {
  id: string;
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function BtnAddFriend({ id, setTypeUser }: TypeProps) {
  return (
    <button
      className="w-36 p-2 rounded-md bg-primary gap-2 flex items-center justify-center"
      onClick={() => {
        setTypeUser("friend");
        addFriend(id);
      }}
    >
      <AddFriendIcon edit="w-5 fill-primaryText" />
      <span className="text-primaryText text-sm">Add friend</span>
    </button>
  );
}
