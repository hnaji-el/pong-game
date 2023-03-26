import React, { useContext, useState } from "react";
import friendPicture from "../assets/friend.jpg";
import pictureUser from "../assets/user.jpg";
import { Link } from "react-router-dom";
import {
  AddFiriendSearchIcon,
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
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ActiveProfile } from "../Components/Routes/Profile";
import { ActiveProfileUser } from "./Routes/ProfileUser";
import { MessagesContext } from "./Routes/Messages";
import { AddMemberContext } from "./Modals/AddMember";
import { MembersContext } from "./Modals/Members";
import {
  addToRoom,
  deleteRoom,
  getAllChannels,
  getFriendChannel,
  getMembersChannel,
  leaveRoom,
  setAdmin,
  setBlock,
  setKick,
  setMute,
} from "../API";

interface TypeCardProfile {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypePropsChannel {
  setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}

interface TypeMember {
  data: any;
  role?: string;
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

interface TypeChat {
  data: any;
}

interface TypeConversation {
  data: any;
  index: number;
}

interface TypeChannelConversation {
  data: any;
  index: number;
}

interface TypeFriendChannel {
  data: any;
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
  let dataUser = useContext(ActiveProfile);

  return (
    <div className={`flex items-center`}>
      <div className="flex items-center gap-2">
        <img
          src={dataUser.settings.pictureURL}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-primaryText text-md max-w-xs overflow-hidden text-ellipsis whitespace-nowrap capitalize`}
            >
              {dataUser.settings.nickname}
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

export function CardProfileUser({ data }: TypeDataProfileUser) {
  return (
    <div className={`flex items-center`}>
      <div className="flex items-center gap-2">
        <img
          src={data?.pictureURL}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-primaryText text-md max-w-xs overflow-hidden text-ellipsis whitespace-nowrap capitalize`}
            >
              {data?.nickname}
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

export function CardUser({ data }: TypedataFriend) {
  const dataUser = useContext(ActiveProfileUser);
  return (
    <div className="flex items-center p-4 w-full  lg:w-[30.8%] shadow justify-between bg-body rounded-xl">
      {data.id === dataUser.settings.id ? (
        <Link
          to="/Profile"
          state={{ id: data.id }}
          className="flex w-full gap-3 items-center"
        >
          <img
            src={data.pictureURL}
            alt="Friend"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-sm text-primaryText w-[6.4rem] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
            {data.nickname}
          </span>
        </Link>
      ) : (
        <Link
          to="/ProfileUser"
          state={{ id: data.id }}
          className="flex w-full gap-3 items-center"
        >
          <img
            src={data.pictureURL}
            alt="Friend"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-sm text-primaryText w-[6.4rem] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
            {data.nickname}
          </span>
        </Link>
      )}
      <Menu>
        <MenuButton className="p-1 h-4 w-4 bg-shape hover:bg-backgroundHover flex items-center justify-center rounded-full">
          <PointsIcon edit="w-2 h-2 fill-secondaryText" />
        </MenuButton>
        <MenuList className="bg-body rounded-md shadow right-0 w-36 flex flex-col py-5 gap-2 list-dropdown cursor-default text-primaryText text-sm">
          <MenuItem className="flex gap-2 hover:bg-backgroundHover font-light justify-center items-center py-2 px-3">
            Invite to play
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export function CardConversation({ data, index }: TypeConversation) {
  const stateMessages = useContext(StateMssages);
  const messageData = useContext(MessagesContext);
  return (
    <div
      className={`border-b-[1px] border-b-backgroundHover last:border-b-0 flex hover:bg-backgroundHover px-3 lg:px-2 ${
        index === messageData.indexDm ? "lg:bg-backgroundHover" : null
      }`}
    >
      <Link
        to=""
        className="flex flex-1 justify-between py-4"
        onClick={() => {
          messageData.setIndexDm(index);
          stateMessages.setClick(true);
          messageData.setDataChatBox(messageData.dataDm[index]);
          messageData.setTypeDm("chat");
        }}
      >
        <div className="flex items-center gap-2">
          <img
            src={data.picture}
            alt="Friend"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText capitalize">
                {data.username}
              </span>
            </div>
            <span className="text-left w-40 overflow-hidden text-ellipsis text-xs font-light text-secondaryText">
              {data.latestMessage}
            </span>
          </div>
        </div>
      </Link>
      <span className="flex justify-center items-center">
        <Menu>
          <MenuButton className="p-0 flex items-center justify-center rounded-full group">
            <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
          </MenuButton>
          <MenuList className="bg-body rounded-md shadow right-0 w-36 flex flex-col py-5 gap-2 list-dropdown cursor-default text-primaryText text-sm">
            <MenuItem className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize">
              settings
            </MenuItem>
            <MenuItem className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize">
              logout
            </MenuItem>
          </MenuList>
        </Menu>
      </span>
    </div>
  );
}

export function CardChannelConversation({
  index,
  data,
}: TypeChannelConversation) {
  const stateMessages = useContext(StateMssages);
  const messageData = useContext(MessagesContext);
  return (
    <div
      className={`border-b-[1px] border-b-backgroundHover last:border-b-0 flex hover:bg-backgroundHover px-3 lg:px-2 ${
        messageData.indexDm === -1 && index === messageData.indexChannel
          ? "lg:bg-backgroundHover"
          : null
      }`}
    >
      <Link
        to=""
        className="flex flex-1 justify-between items-start py-4"
        onClick={() => {
          stateMessages.setClick(true);
          messageData.setIndexChannel(index);
          messageData.setTypeDm("channel");
          messageData.setIndexDm(-1);
          messageData.setDataChatBox(messageData.channelDm[index]);
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText capitalize">
                {data.name}
              </span>
            </div>
            <span className="text-left w-40 overflow-hidden text-ellipsis text-xs font-light text-secondaryText">
              {data.latestMessage}
            </span>
          </div>
        </div>
        {data.type === "private" ? (
          <div className="bg-primary w-12 p-.6 text-primaryText rounded-full text-center relative top-[.3rem] z-[-1] right-2 text-[.6rem] font-light capitalize">
            private
          </div>
        ) : null}
      </Link>
      <span className="flex justify-center items-center">
        <Menu>
          <MenuButton className="p-0 flex items-center justify-center rounded-full group">
            <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
          </MenuButton>
          <MenuList className="bg-body rounded-md shadow right-0 w-36 flex flex-col py-5 gap-2 list-dropdown cursor-default text-primaryText text-sm">
            {data.role === "owner" ? (
              <MenuItem
                className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
                onClick={async () => {
                 await deleteRoom(data.name);
                  getAllChannels((res: any) => {
                    console.log("data channel:", res);
                    messageData.setChannelDm(res);
                  });
                }}
              >
                delete
              </MenuItem>
            ) : null}
            <MenuItem
              className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
              onClick={() => {
                getAllChannels((res: any) => {
                  messageData.setChannelDm(res);
                  leaveRoom(data.name);
                });
              }}
            >
              leave
            </MenuItem>
          </MenuList>
        </Menu>
      </span>
    </div>
  );
}

export function CardChatFriend({ data }: TypeChat) {
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
          src={data?.picture}
          alt="Friend"
          className="h-14 w-14 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-md text-primaryText max-w-sm overflow-hidden text-ellipsis whitespace-nowrap capitalize">
              {data?.username}
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
  data,
}: TypePropsChannel) {
  
  const stateMessages = useContext(StateMssages);
  return (
    <div className="flex flex-1 items-center gap-4">
      <button
        className="w-6 h-6 rounded-full flex lg:hidden justify-center items-center bg-shape hover:bg-backgroundHover"
        onClick={() => {
          stateMessages.setClick(false);
        }}
      >
        <ArrowLeftIcon edit="w-2.5 h-2.5 fill-secondaryText" />
      </button>
      <div className="flex items-center w-full gap-2">
        <div className="flex lg:gap-4 w-full justify-between items-center lg:justify-start">
          <span className="text-[1.1rem] text-primaryText max-w-sm overflow-hidden text-ellipsis whitespace-nowrap capitalize">
            {data?.name}
          </span>
          <div className="flex items-center gap-4">
            {data?.role !== "member" && data?.type !== "protected" ? (
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover"
                onClick={() => {
                  setAddMember(true);
                }}
              >
                <PlusIcon edit="fill-secondaryText w-4 h-4" />
              </button>
            ) : null}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover"
              onClick={() => {
                setMembers(true);
              }}
            >
              <GroupIcon edit="fill-secondaryText w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardFriendMember({ data }: TypeFriendChannel) {
  const messageData = useContext(MessagesContext);
  const addMemberData = useContext(AddMemberContext);
  return (
    <div className={`flex flex-1 items-center px-4 justify-between gap-0.5`}>
      <div className="flex items-center gap-2">
        <img
          src={data.pictureURL}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span
              className={`text-primaryText text-md name-member overflow-hidden text-ellipsis whitespace-nowrap capitalize`}
            >
              {data.nickname}
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
      <button
        className="w-7 h-7 bg-body p-1 rounded-full flex justify-center items-center"
        onClick={async () => {
          let obj = {
            name: messageData.dataChatBox.name,
            type: messageData.dataChatBox.type,
            login: data.nickname,
          };
          await addToRoom(obj);
          getFriendChannel((res: any) => {
            addMemberData.setFriend(res);
          }, messageData.dataChatBox.name);
        }}
      >
        <PlusIcon edit="fill-secondaryText w-3 h-3" />
      </button>
    </div>
  );
}

export function CardMember({ data, role }: TypeMember) {
  const messageData = useContext(MessagesContext);
  const memberData = useContext(MembersContext);
  return (
    <div className={`flex flex-1 items-center px-4 justify-between gap-0.5`}>
      <div className="flex items-center gap-2">
        <img
          src={data.pictureLink}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span
              className={`text-primaryText text-md name-member overflow-hidden text-ellipsis whitespace-nowrap capitalize`}
            >
              {data.username}
            </span>
            {role !== "member" ? (
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
            ) : null}
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full bg-online`}></span>
            <span className="text-secondaryText font-light text-sm capitalize">
              online
            </span>
          </div>
        </div>
      </div>

      <Menu>
        <MenuButton className="p-1 h-7 w-7 bg-body flex items-center justify-center rounded-full">
          <PointsIcon edit="fill-secondaryText w-3 h-3 mx-auto" />
        </MenuButton>

        {/* Owner */}
        {messageData.dataChatBox.role === "owner" ? (
          <MenuList className="bg-body rounded-md shadow right-0 w-36 flex flex-col py-5 gap-2 list-dropdown cursor-default text-primaryText text-sm">
            <MenuItem className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize font-light">
              Invite to play
            </MenuItem>
            <MenuItem
              className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
              onClick={async() => {
                let obj = {
                  name: messageData.dataChatBox.name,
                  login: data.username,
                };
                await setAdmin(obj);
                getMembersChannel((res: any) => {
                  memberData.setMembers(res);
                }, messageData.dataChatBox.name);
              }}
            >
              admin
            </MenuItem>
            <MenuItem
              className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
              onClick={async () => {
                let obj = {
                  name: messageData.dataChatBox.name,
                  login: data.username,
                };
                await setBlock(obj);
                getMembersChannel((res: any) => {
                  memberData.setMembers(res);
                }, messageData.dataChatBox.name);
              }}
            >
              block
            </MenuItem>
            <MenuItem
              className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
              onClick={async () => {
                let obj = {
                  name: messageData.dataChatBox.name,
                  login: data.username,
                };
                await setKick(obj);
                getMembersChannel((res: any) => {
                  memberData.setMembers(res);
                }, messageData.dataChatBox.name);
              }}
            >
              kick
            </MenuItem>
            <MenuItem
              className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
              onClick={async () => {
                let obj = {
                  name: messageData.dataChatBox.name,
                  login: data.username,
                };
                await setMute(obj);
                getMembersChannel((res: any) => {
                  memberData.setMembers(res);
                }, messageData.dataChatBox.name);
              }}
            >
              mute
            </MenuItem>
          </MenuList>
        ) : null}

        {/* Admin */}
        {messageData.dataChatBox.role === "admin" ? (
          <MenuList className="bg-body rounded-md shadow right-0 w-36 flex flex-col py-5 gap-2 list-dropdown cursor-default text-primaryText text-sm">
            <MenuItem className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize font-light">
              Invite to play
            </MenuItem>
            {role === "member" ? (
              <>
                <MenuItem
                  className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
                  onClick={async () => {
                    let obj = {
                      name: messageData.dataChatBox.name,
                      login: data.username,
                    };
                    await setBlock(obj);
                    getMembersChannel((res: any) => {
                      memberData.setMembers(res);
                    }, messageData.dataChatBox.name);
                  }}
                >
                  block
                </MenuItem>
                <MenuItem
                  className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
                  onClick={async () => {
                    let obj = {
                      name: messageData.dataChatBox.name,
                      login: data.username,
                    };
                    await setKick(obj);
                    getMembersChannel((res: any) => {
                      memberData.setMembers(res);
                    }, messageData.dataChatBox.name);
                  }}
                >
                  kick
                </MenuItem>
                <MenuItem
                  className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize"
                  onClick={async () => {
                    let obj = {
                      name: messageData.dataChatBox.name,
                      login: data.username,
                    };
                    await setMute(obj);
                    getMembersChannel((res: any) => {
                      memberData.setMembers(res);
                    }, messageData.dataChatBox.name);
                  }}
                >
                  mute
                </MenuItem>
              </>
            ) : null}
          </MenuList>
        ) : null}
        {/* Admin */}
        {messageData.dataChatBox.role === "member" ? (
          <MenuList className="bg-body rounded-md shadow right-0 w-36 flex flex-col py-5 gap-2 list-dropdown cursor-default text-primaryText text-sm">
            <MenuItem className="flex gap-2 hover:bg-backgroundHover items-center py-2 px-3 capitalize font-light">
              Invite to play
            </MenuItem>
          </MenuList>
        ) : null}
      </Menu>
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
    <div className="hover:bg-backgroundHover px-4 py-2">
      <div className="flex items-center justify-between w-full">
        <Link
          to="/ProfileUser"
          state={{ id: data.id }}
          className="flex items-center gap-3 flex-1"
          onClick={() => {
            setDropDown(false);
            if (setOpenSearch) setOpenSearch(false);
          }}
        >
          <img
            src={data.pictureURL}
            alt="users"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-primaryText text-sm username-search capitalize">
            {data.nickname}
          </span>
        </Link>
      </div>
    </div>
  );
}
