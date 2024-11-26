import React from "react";
import { CardFriendOnline } from "./Cards";
export default function ListFriendOnline() {
  return (
    <div className=" hidden lg:flex flex-col gap-6 h-full overflow-hidden">
      <div className=" px-2 flex items-center justify-between">
        <span className="text-primaryText text-sm">Friends</span>
        <span className="bg-shape text-secondaryText text-xs p-2 rounded-full h-5 w-5 flex justify-center items-center font-bold">
          2
        </span>
      </div>
      <div className="flex flex-col gap-7 h-full overflow-auto overflow-x-hidden">
        <CardFriendOnline />
        <CardFriendOnline />
      </div>
    </div>
  );
}
