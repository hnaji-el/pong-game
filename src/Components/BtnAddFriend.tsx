import React from "react";
import { AddFriendIcon } from "./Icons";

export default function BtnAddFriend() {
  return (
    <button className="w-36 p-2 rounded-md bg-primary gap-2 flex items-center justify-center">
      <AddFriendIcon edit="w-5 fill-primaryText" />
      <span className="text-primaryText text-sm">Add friend</span>
    </button>
  );
}
