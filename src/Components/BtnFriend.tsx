import React from "react";
import { FriendIcon, ArrowDownIcon } from "./Icons";

export default function BtnFriend() {
  return (
    <div className="relative">
      <button className="w-36 p-2 rounded-md bg-shape gap-6 flex items-center justify-center">
        <div className="flex gap-2">
          <FriendIcon edit="w-5 fill-primaryText" />
          <span className="text-primaryText text-sm">Friends</span>
        </div>
        <span className="rounded-full">
          <ArrowDownIcon edit="w-2 h-2 fill-primaryText" />
        </span>
      </button>
    </div>
  );
}
