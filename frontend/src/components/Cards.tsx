import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import friendPicture from "../assets/friend.jpg";
import { PointsIcon, SettingsIcon } from "./Icons";
import CircleAchievements from "./CircleAchievements";
import { ActiveProfile } from "../pages/Profile/Profile";
import { ActiveProfileUser } from "../pages/ProfileUser/ProfileUser";
import { globalSocket } from "../utilities/socket";
import VisuallyHidden from "./VisuallyHidden";
import Dropdown from "./Dropdown/Dropdown";
import useToggle from "../hooks/use-toggle";

interface TypeCardProfile {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypeSearch {
  data: {
    id: string;
    nickname: string;
    pictureURL: string;
    isFriendToLoggedUser: boolean;
  };
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypeDataProfileUser {
  data?: {
    friendsNumber: number;
    id: string;
    isBlockedByLoggedUser: boolean;
    isFriendToLoggedUser: boolean;
    nickname: string;
    pictureURL: string;
    status: string;
  };
}

interface TypedataFriend {
  data: {
    id: string;
    nickname: string;
    pictureURL: string;
  };
}

export function CardFriendOnline() {
  return (
    <Link
      to="/chat"
      className="flex items-center justify-between p-2 hover:bg-backgroundHover"
    >
      <div className="flex items-center gap-2">
        <img
          src={friendPicture}
          alt="Friend"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="w-36 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText">
            Username
          </span>
          <span className="text-xs font-light text-secondaryText">Online</span>
        </div>
      </div>
      <span className="h-1.5 w-1.5 rounded-full bg-online"></span>
    </Link>
  );
}

export function CardProfile({ setOpen }: TypeCardProfile) {
  let dataUser = useContext(ActiveProfile);

  return (
    <div className={`flex items-center`}>
      <div className="flex items-center gap-2">
        <img
          src={dataUser.settings.pictureURL}
          alt="Profile"
          className="h-20 w-20 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-md max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-primaryText`}
            >
              {dataUser.settings.nickname}
            </span>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-shape"
              onClick={() => {
                if (setOpen) setOpen(true);
              }}
            >
              <SettingsIcon edit="w-4 h-4 fill-secondaryText" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                dataUser.settings.status === "offline"
                  ? "bg-offline"
                  : "bg-online"
              }`}
            ></span>
            <span className="text-sm font-light capitalize text-secondaryText">
              {dataUser.settings.status === "offline" ? "offline" : "online"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardProfileUser({ data }: TypeDataProfileUser) {
  return (
    <div className={`flex items-center`}>
      <div className="flex items-center gap-2">
        <img
          src={data?.pictureURL}
          alt="Profile"
          className="h-20 w-20 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-md max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-primaryText`}
            >
              {data?.nickname}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                data?.status === "offline" ? "bg-offline" : "bg-online"
              }`}
            ></span>
            <span className="text-sm font-light capitalize text-secondaryText">
              {data?.status === "offline" ? "offline" : "online"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardAchievments() {
  return (
    <div className="flex w-[26rem] items-center justify-center gap-5 rounded-xl bg-body p-5 shadow">
      <CircleAchievements />
      <div className="flex flex-col gap-1">
        <span className="text-4xl text-primaryText">4</span>
        <span className="text-sm text-secondaryText">
          Achievement four wins
        </span>
      </div>
    </div>
  );
}

export function CardUser({ data }: TypedataFriend) {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const dataUser = useContext(ActiveProfileUser);

  function handleInviteToPlay() {
    globalSocket.emit("inviteToPlay", {
      sender: dataUser.settings,
      receiverId: data.id,
    });
  }

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-body p-4 shadow lg:w-[30.8%]">
      {data.id === dataUser.settings.id ? (
        <Link
          to="/profile"
          state={{ id: data.id }}
          className="flex w-full items-center gap-3"
        >
          <img
            src={data.pictureURL}
            alt="Friend"
            className="h-12 w-12 rounded-full"
          />
          <span className="w-[6.4rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText">
            {data.nickname}
          </span>
        </Link>
      ) : (
        <Link
          to="/profile-user"
          state={{ id: data.id }}
          className="flex w-full items-center gap-3"
        >
          <img
            src={data.pictureURL}
            alt="Friend"
            className="h-12 w-12 rounded-full"
          />
          <span className="w-[6.4rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText">
            {data.nickname}
          </span>
        </Link>
      )}

      {data.id !== dataUser.settings.id && (
        <Dropdown
          className="right-0 top-full translate-y-[8px]"
          isOpen={isDropdownOpen}
          toggleIsOpen={toggleIsDropdownOpen}
          options={[{ label: "invite to play" }]}
          handleSelect={(option) => {
            if (option === "invite to play") handleInviteToPlay();
          }}
        >
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover"
            onClick={toggleIsDropdownOpen}
          >
            <PointsIcon edit="w-3 h-3 fill-secondaryText" />
            <VisuallyHidden>Show more actions</VisuallyHidden>
          </button>
        </Dropdown>
      )}
    </div>
  );
}

export function CardSearchUser({
  setDropDown,
  setOpenSearch,
  data,
}: TypeSearch) {
  const [stateFriend, setFriend] = useState<boolean>(data.isFriendToLoggedUser);
  return (
    <div className="px-4 py-2 hover:bg-backgroundHover">
      <div className="flex w-full items-center justify-between">
        <Link
          to="/profile-user"
          state={{ id: data.id }}
          className="flex flex-1 items-center gap-3"
          onClick={() => {
            setDropDown(false);
            if (setOpenSearch) {
              setOpenSearch(false);
              document.body.style.overflow = "auto";
            }
          }}
        >
          <img
            src={data.pictureURL}
            alt="users"
            className="h-12 w-12 rounded-full"
          />
          <span className="username-search text-sm text-primaryText">
            {data.nickname}
          </span>
        </Link>
      </div>
    </div>
  );
}
