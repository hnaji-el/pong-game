import React, { useContext } from "react";
import friendPicture from "../assets/friend.jpg";
import pictureUser from "../assets/user.jpg";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  GroupIcon,
  PlusIcon,
  PointsIcon,
  SettingsIcon,
} from "./Icons";
import CircleAchievements from "./CircleAchievements";
import { firstLetterCapital } from "../helpers";
import PictureFriend from "../assets/friend.jpg";
import { StateMssages } from "./Routes/Messages";
import PasswordChannel from "./PasswordChannel";
import { Dropdown, DropdownBtn, DropdownItem, DropdownList } from "./Dropdown";

interface TypeCardProfile {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypePropsChannel {
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypeMember {
  role?: string;
}

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

export function CardProfile({ setOpen }: TypeCardProfile) {
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
            <button
              className="w-8 h-8 bg-shape flex justify-center items-center rounded-full"
              onClick={() => {
                if (setOpen) setOpen(true);
              }}
            >
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

      <Dropdown>
        <DropdownBtn
          type="icon"
          icon={<PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />}
          edit="h-4 w-4 bg-shape hover:bg-backgroundHover"
        />
        <DropdownList edit="top-6">
          <DropdownItem edit="py-2 px-3">Settings</DropdownItem>
          <DropdownItem edit="py-2 px-3">Logout</DropdownItem>
        </DropdownList>
      </Dropdown>
    </Link>
  );
}

export function CardConversation() {
  const stateMessages = useContext(StateMssages);
  return (
    <Link
      to=""
      className="border-b-[1px] border-b-backgroundHover last:border-b-0 flex hover:bg-backgroundHover px-3 lg:px-2 cursor-pointer"
      onClick={() => {
        stateMessages.setClick(true);
      }}
    >
      <div className="flex flex-1 justify-between py-4">
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
            <span className="text-left w-40 overflow-hidden text-ellipsis text-xs font-light text-secondaryText">
              hello
            </span>
          </div>
        </div>
      </div>
      <span className="flex justify-center items-center">
        <Dropdown>
          <DropdownBtn
            type="icon"
            icon={<PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />}
          />
          <DropdownList edit="top-6">
            <DropdownItem edit="py-2 px-3">Settings</DropdownItem>
            <DropdownItem edit="py-2 px-3">Logout</DropdownItem>
          </DropdownList>
        </Dropdown>
      </span>
    </Link>
  );
}

export function CardChatFriend() {
  const stateMessages = useContext(StateMssages);
  return (
    <div className="flex flex-1 items-center gap-4">
      <button
        className="w-6 h-6 rounded-full flex lg:hidden justify-center items-center bg-shape"
        onClick={() => {
          stateMessages.setClick(false);
        }}
      >
        <ArrowLeftIcon edit="w-2.5 h-2.5 fill-secondaryText" />
      </button>
      <div className="flex items-center gap-2">
        <img
          src={PictureFriend}
          alt="Friend"
          className="h-14 w-14 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-md text-primaryText max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {firstLetterCapital("mouassit")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-online"></span>
            <span className="text-sm font-light text-secondaryText">
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardChatChannel({
  setAddMember,
  setMembers,
}: TypePropsChannel) {
  const stateMessages = useContext(StateMssages);
  return (
    <div className="flex flex-1 items-center gap-4">
      <button
        className="w-6 h-6 rounded-full flex lg:hidden justify-center items-center bg-shape"
        onClick={() => {
          stateMessages.setClick(false);
        }}
      >
        <ArrowLeftIcon edit="w-2.5 h-2.5 fill-secondaryText" />
      </button>
      <div className="flex items-center w-full gap-2">
        <img
          src={PictureFriend}
          alt="Friend"
          className="h-14 w-14 rounded-full"
        />
        <div className="flex lg:gap-4 w-full justify-between lg:justify-start">
          <div className="flex items-center gap-1.5">
            <span className="text-md text-primaryText max-w-sm overflow-hidden text-ellipsis whitespace-nowrap capitalize">
              channel 01
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-shape"
              onClick={() => {
                setAddMember(true);
              }}
            >
              <PlusIcon edit="fill-secondaryText w-4 h-4" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-shape"
              onClick={() => {
                setMembers(true);
              }}
            >
              <GroupIcon edit="fill-secondaryText w-5 h-5" />
            </button>
            <PasswordChannel />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardFriendMember() {
  return (
    <div className={`flex flex-1 items-center px-4 justify-between gap-0.5`}>
      <div className="flex items-center gap-2">
        <img
          src={pictureUser}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span
              className={`text-primaryText text-md name-member overflow-hidden text-ellipsis whitespace-nowrap capitalize`}
            >
              mouassit
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full bg-online`}></span>
            <span className="text-secondaryText font-light text-sm capitalize">
              online
            </span>
          </div>
        </div>
      </div>
      <button className="w-7 h-7 bg-body p-1 rounded-full flex justify-center items-center">
        <PlusIcon edit="fill-secondaryText w-3 h-3" />
      </button>
    </div>
  );
}

export function CardMember({ role }: TypeMember) {
  return (
    <div className={`flex flex-1 items-center px-4 justify-between gap-0.5`}>
      <div className="flex items-center gap-2">
        <img
          src={pictureUser}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span
              className={`text-primaryText text-md name-member overflow-hidden text-ellipsis whitespace-nowrap capitalize`}
            >
              mouassit
            </span>
            <span
              className={`w-16 rounded-sm ${
                role === "owner"
                  ? "bg-ownerBg text-ownerText"
                  : role === "admin"
                  ? "bg-adminBg text-adminText"
                  : ""
              } flex justify-center items-center text-xs capitalize`}
            >
              {role}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full bg-online`}></span>
            <span className="text-secondaryText font-light text-sm capitalize">
              online
            </span>
          </div>
        </div>
      </div>

      <Dropdown>
        <DropdownBtn
          type="icon"
          icon={<PointsIcon edit="fill-secondaryText w-3 h-3" />}
          edit="h-7 w-7 bg-body"
        />
        <DropdownList edit="top-10">
          <DropdownItem edit="py-2 px-3">Settings</DropdownItem>
          <DropdownItem edit="py-2 px-3">Logout</DropdownItem>
        </DropdownList>
      </Dropdown>
      {/* <button className="w-7 h-7 bg-body p-1 rounded-full flex justify-center items-center">
        <PointsIcon edit="fill-secondaryText w-3 h-3" />
      </button> */}
    </div>
  );
}
