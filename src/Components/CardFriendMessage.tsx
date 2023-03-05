import React from "react";
import PictureFriend from "../assets/friend.jpg";
import { firstLetterCapital } from "../helpers";
import { PointsIcon } from "./Icons";

export default function CardFriendMessage() {
  return (
    <div className="border-b-[1px] border-b-backgroundHover last:border-b-0 flex justify-between px-3 lg:px-2 py-4 hover:bg-backgroundHover cursor-pointer">
      <div className="flex items-center gap-2">
        <img
          src={PictureFriend}
          alt="Friend"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText">
              {firstLetterCapital("mouassit")}
            </span>
          </div>
          <span className="w-40 overflow-hidden text-ellipsis text-xs font-light text-secondaryText">
            hello
          </span>
        </div>
      </div>
      <div className="relative">
        <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
      </div>
    </div>
  );
}
