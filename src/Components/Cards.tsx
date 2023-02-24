import React from "react";
import friendPicture from "../assets/friend.jpg";
import pictureUser from "../assets/user.jpg";
import { Link } from "react-router-dom";
import { PointsIcon, SettingsIcon } from "./Icons";
import CircleAchievements from "./CircleAchievements";
import { firstLetterCapital } from "../helpers";

export function CardFriendOnline() {
  return (
    <Link
      to="/Messages"
      className="flex items-center justify-between hover:bg-backgroundHover p-2"
    >
      <div className="flex items-center gap-2">
        <img
          src={friendPicture}
          alt="Friend"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="text-primaryText text-sm w-36 overflow-hidden text-ellipsis whitespace-nowrap">
            Username
          </span>
          <span className="text-secondaryText font-light text-xs">Online</span>
        </div>
      </div>
      <span className="w-1.5 h-1.5 bg-online rounded-full"></span>
    </Link>
  );
}

export function CardProfile() {
  return (
    <div className={`flex items-center`}>
      <div className="flex items-center gap-2">
        <img
          src={pictureUser}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-primaryText text-md max-w-xs overflow-hidden text-ellipsis whitespace-nowrap`}
            >
              {firstLetterCapital("mouassit")}
            </span>
            <button className="w-8 h-8 bg-shape flex justify-center items-center rounded-full">
              <SettingsIcon edit="w-4 h-4 fill-secondaryText" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full bg-online`}></span>
            <span className="text-secondaryText font-light text-sm">
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardProfileUser() {
  return (
    <div className={`flex items-center`}>
      <div className="flex items-center gap-2">
        <img
          src={pictureUser}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-primaryText text-md max-w-xs overflow-hidden text-ellipsis whitespace-nowrap`}
            >
              {firstLetterCapital("mouassit")}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full bg-online`}></span>
            <span className="text-secondaryText font-light text-sm">
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardAchievments() {
  return (
    <div className="flex items-center justify-center p-5 w-[26rem] shadow gap-5 bg-body rounded-xl">
      <CircleAchievements />
      <div className="flex flex-col gap-1">
        <span className="text-primaryText text-4xl">10</span>
        <span className="text-secondaryText text-sm">
          Achievements completed
        </span>
      </div>
    </div>
  );
}

export function CardUser() {
  return (
    <Link
      to="/"
      className="flex items-center p-4 w-full  lg:w-[30.8%] shadow justify-between bg-body rounded-xl"
    >
      <div className="flex gap-3 items-center">
        <img
          src={friendPicture}
          alt="Friend"
          className="w-12 h-12 rounded-full"
        />
        <span className="text-sm text-primaryText w-[6.4rem] overflow-hidden text-ellipsis whitespace-nowrap">
          {firstLetterCapital("mouassit")}
        </span>
      </div>
      <button className="flex h-4 w-4 items-center justify-center rounded-full bg-shape p-1 hover:bg-backgroundHover">
        <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
      </button>
    </Link>
  );
}
