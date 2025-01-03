import React from "react";

import { Link } from "react-router-dom";

import ArrowLeftButton from "./ArrowLeftButton";

interface PropsType {
  id: string;
  nickname: string;
  avatar: string;
  isOnline: boolean;
  onClick: () => void;
}

function UserCard({ id, nickname, avatar, isOnline, onClick }: PropsType) {
  return (
    <div className="flex flex-1 items-center gap-4">
      <ArrowLeftButton onClick={onClick} />
      <Link
        to="/profile-user"
        state={{ id }}
        className="flex items-center gap-2"
      >
        <img src={avatar} alt="friend" className="h-14 w-14 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-md max-w-sm overflow-hidden text-ellipsis whitespace-nowrap text-primaryText">
              {nickname}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline ? "bg-online" : "bg-offline"
              }`}
            ></span>
            <span className="text-sm font-light capitalize text-secondaryText">
              {isOnline ? "online" : "offline"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserCard;
