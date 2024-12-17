import React, { useContext, useState } from "react";
import friendPicture from "../assets/friend.jpg";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  GroupIcon,
  LockIcon,
  PlusIcon,
  PointsIcon,
  SettingsIcon,
} from "./Icons";
import CircleAchievements from "./CircleAchievements";
import { StateMssages } from "../pages/Messages";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ActiveProfile } from "../pages/Profile";
import { ActiveProfileUser } from "../pages/ProfileUser";
import { MessagesContext } from "../pages/Messages";
import { AddMemberContext } from "./modals/AddMember";
import { MembersContext } from "./modals/Members";
import {
  addToRoom,
  blockFriend,
  deleteRoom,
  getAllChannels,
  getDmUsers,
  getFriendChannel,
  getMembersChannel,
  joinRoom,
  leaveRoom,
  setAdmin,
  setBlock,
  setKick,
  setMute,
} from "../api/API";
import { globalSocket } from "../utilities/socket";

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
      to="/messages"
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
  const dataUser = useContext(ActiveProfileUser);
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
      {data.id !== dataUser.settings.id ? (
        <Menu>
          <MenuButton className="flex h-4 w-4 items-center justify-center rounded-full bg-shape p-1 hover:bg-backgroundHover">
            <PointsIcon edit="w-2 h-2 fill-secondaryText" />
          </MenuButton>
          <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
            <MenuItem
              className="flex items-center justify-center gap-2 px-3 py-2 font-light hover:bg-backgroundHover"
              onClick={() => {
                globalSocket.emit("inviteToPlay", {
                  sender: dataUser.settings,
                  receiverId: data.id,
                });
              }}
            >
              Invite to play
            </MenuItem>
          </MenuList>
        </Menu>
      ) : null}
    </div>
  );
}

export function CardConversation({ data, index }: TypeConversation) {
  const stateMessages = useContext(StateMssages);
  const messageData = useContext(MessagesContext);
  const dataUser = useContext(StateMssages);
  return (
    <div
      className={`flex border-b-[1px] border-b-backgroundHover px-3 last:border-b-0 hover:bg-backgroundHover lg:px-2 ${
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
              <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primaryText">
                {data.username}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <span className="flex items-center justify-center">
        <Menu>
          <MenuButton className="group flex items-center justify-center rounded-full p-0">
            <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
          </MenuButton>
          <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
              onClick={() => {
                globalSocket.emit("inviteToPlay", {
                  sender: dataUser.settings,
                  receiverId: data.id,
                });
              }}
            >
              Invite to play
            </MenuItem>
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
              onClick={async () => {
                await blockFriend(data.id);
                getDmUsers((res: any) => {
                  messageData.setDataDm(res);
                });
              }}
            >
              block
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
      className={`flex border-b-[1px] border-b-backgroundHover px-3 last:border-b-0 hover:bg-backgroundHover lg:px-2 ${
        messageData.indexDm === -1 && index === messageData.indexChannel
          ? "lg:bg-backgroundHover"
          : null
      }`}
    >
      <button
        className="flex flex-1 items-start justify-between py-4"
        onClick={() => {
          if (!data.role.length && data.type === "PUBLIC") {
            let obj = {
              name: data.name,
              type: "PUBLIC",
            };

            joinRoom((res: any) => {
              stateMessages.setClick(true);
              messageData.setIndexChannel(index);
              messageData.setTypeDm("channel");
              messageData.setIndexDm(-1);
              messageData.setDataChatBox(res);
              getAllChannels((response: any) => {
                messageData.setChannelDm(response);
              });
            }, obj);
          } else {
            if (!data.role.length && data.type === "PROTECTED") {
              messageData.setIndexChannel(index);
              messageData.setpasswordProtected(true);
            } else {
              stateMessages.setClick(true);
              messageData.setIndexChannel(index);
              messageData.setTypeDm("channel");
              messageData.setIndexDm(-1);
              messageData.setDataChatBox(messageData.channelDm[index]);
            }
          }
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize text-primaryText">
                {data.name}
              </span>
            </div>
          </div>
        </div>
        {data.type === "PRIVATE" ? (
          <div className="p-.6 relative right-2 top-[.2rem] z-[-1] w-12 rounded-full bg-primary text-center text-[.6rem] font-light capitalize text-primaryText">
            private
          </div>
        ) : null}
      </button>
      {data.role.length ? (
        <span className="flex items-center justify-center">
          <Menu>
            <MenuButton className="group flex items-center justify-center rounded-full p-0">
              <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
            </MenuButton>
            <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
              {data.role === "owner" ? (
                <MenuItem
                  className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
                  onClick={async () => {
                    await deleteRoom(data.name);
                    getAllChannels((res: any) => {
                      messageData.setChannelDm(res);
                    });
                  }}
                >
                  delete
                </MenuItem>
              ) : null}
              <MenuItem
                className="flex items-center gap-2 px-3 py-2 capitalize hover:bg-backgroundHover"
                onClick={async () => {
                  await leaveRoom(data.name);
                  getAllChannels((res: any) => {
                    messageData.setChannelDm(res);
                  });
                }}
              >
                leave
              </MenuItem>
            </MenuList>
          </Menu>
        </span>
      ) : data.type === "PROTECTED" ? (
        <div className="flex items-center justify-center">
          <LockIcon edit="w-4 h-4 fill-secondaryText" />
        </div>
      ) : null}
    </div>
  );
}

export function CardChatFriend({ data }: TypeChat) {
  const stateMessages = useContext(StateMssages);
  const messageData = useContext(MessagesContext);
  return (
    <div className="flex flex-1 items-center gap-4">
      {messageData.dataChatBox ? (
        <>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full bg-shape lg:hidden"
            onClick={() => {
              stateMessages.setClick(false);
            }}
          >
            <ArrowLeftIcon edit="w-2.5 h-2.5 fill-secondaryText" />
          </button>
          <Link
            to="/profile-user"
            state={{ id: data?.id }}
            className="flex items-center gap-2"
          >
            <img
              src={data?.picture}
              alt="Friend"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-md max-w-sm overflow-hidden text-ellipsis whitespace-nowrap text-primaryText">
                  {data?.username}
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
          </Link>
        </>
      ) : null}
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
        className="flex h-6 w-6 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover lg:hidden"
        onClick={() => {
          stateMessages.setClick(false);
        }}
      >
        <ArrowLeftIcon edit="w-2.5 h-2.5 fill-secondaryText" />
      </button>
      <div className="flex w-full items-center gap-2">
        <div className="flex w-full items-center justify-between lg:justify-start lg:gap-4">
          <span className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap text-[1.1rem] capitalize text-primaryText">
            {data?.name}
          </span>
          <div className="flex items-center gap-4">
            {data?.role !== "member" && data?.type !== "PROTECTED" ? (
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
    <div className={`flex flex-1 items-center justify-between gap-0.5 px-4`}>
      <div className="flex items-center gap-2">
        <img
          src={data.pictureURL}
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span
              className={`text-md name-member overflow-hidden text-ellipsis whitespace-nowrap capitalize text-primaryText`}
            >
              {data.nickname}
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
      <button
        className="flex h-7 w-7 items-center justify-center rounded-full bg-body p-1"
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
  const dataUser = useContext(StateMssages);

  return (
    <div className={`flex flex-1 items-center justify-between gap-0.5 px-4`}>
      <div className="flex items-center gap-2">
        <img
          src={data.pictureLink}
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3">
            <span
              className={`text-md name-member overflow-hidden text-ellipsis whitespace-nowrap text-primaryText`}
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
                } flex items-center justify-center text-xs capitalize`}
              >
                {role}
              </span>
            ) : null}
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

      <Menu>
        <MenuButton className="flex h-7 w-7 items-center justify-center rounded-full bg-body p-1">
          <PointsIcon edit="fill-secondaryText w-3 h-3 mx-auto" />
        </MenuButton>

        {/* Owner */}
        {messageData.dataChatBox.role === "owner" ? (
          <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 font-light capitalize hover:bg-backgroundHover"
              onClick={() => {
                globalSocket.emit("inviteToPlay", {
                  sender: dataUser.settings,
                  receiverId: data.id,
                });
              }}
            >
              Invite to play
            </MenuItem>
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
              onClick={async () => {
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
              className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
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
              className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
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
              className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
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
          <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 font-light capitalize hover:bg-backgroundHover"
              onClick={() => {
                globalSocket.emit("inviteToPlay", {
                  sender: dataUser.settings,
                  receiverId: data.id,
                });
              }}
            >
              Invite to play
            </MenuItem>
            {role === "member" ? (
              <>
                <MenuItem
                  className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
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
                  className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
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
                  className="flex items-center gap-2 px-3 py-2 hover:bg-backgroundHover"
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
        {/* Member */}
        {messageData.dataChatBox.role === "member" ? (
          <MenuList className="list-dropdown right-0 flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 text-sm text-primaryText shadow">
            <MenuItem
              className="flex items-center gap-2 px-3 py-2 font-light capitalize hover:bg-backgroundHover"
              onClick={() => {
                globalSocket.emit("inviteToPlay", {
                  sender: dataUser.settings,
                  receiverId: data.id,
                });
              }}
            >
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
