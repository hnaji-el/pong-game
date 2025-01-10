import React from "react";

import ChannelCard from "./ChannelCard";
import { PlusIcon } from "./Icons";
import { deleteRoom, getAllChannels, joinRoom, leaveRoom } from "../api/API";

import { ChannelType } from "../pages/Chat/types";

interface PropsType {
  setChatDataBox: React.Dispatch<React.SetStateAction<ChannelType>>;
  channels: ChannelType[];
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>;
  channelIndex: number;
  setChannelIndex: React.Dispatch<React.SetStateAction<number>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  openPasswordModal: () => void;
  openCreateChannelModal: () => void;
}

function ChannelCardList({
  setChatDataBox,
  channels,
  setChannels,
  channelIndex,
  setChannelIndex,
  setClick,
  openPasswordModal,
  openCreateChannelModal,
}: PropsType) {
  function handleCardClick(channelData: ChannelType, index: number) {
    if (channelData.isJoined) {
      setClick(true);
      setChannelIndex(index);
      setChatDataBox(channels[index]);
    }

    if (!channelData.isJoined && channelData.type === "PROTECTED") {
      setChannelIndex(index);
      openPasswordModal();
    }

    if (!channelData.isJoined && channelData.type === "PUBLIC") {
      joinRoom(
        (chnlData: ChannelType) => {
          setClick(true);
          setChannelIndex(index);
          setChatDataBox(chnlData);
          getAllChannels((chnlsData: ChannelType[]) => {
            setChannels(chnlsData);
          });
        },
        {
          name: channelData.name,
          type: "PUBLIC",
        },
      );
    }
  }

  async function handleDeleteClick(channelData: ChannelType) {
    await deleteRoom(channelData.name);
    getAllChannels((chnlsData: ChannelType[]) => {
      setChannels(chnlsData);
    });
  }

  async function handleLeaveClick(channelData: ChannelType) {
    await leaveRoom(channelData.name);
    getAllChannels((chnlsData: ChannelType[]) => {
      setChannels(chnlsData);
    });
  }

  return (
    <div className="flex grow flex-col gap-6 overflow-hidden">
      <div className="mx-3 flex items-center gap-2 lg:mx-2">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-[.3rem] bg-primary p-2"
          onClick={openCreateChannelModal}
        >
          <PlusIcon edit="w-2.5 h-2.5 fill-primaryText" />
          <span className="text-sm font-light text-primaryText">
            Add channel
          </span>
        </button>
      </div>

      {channels.length ? (
        <div className="flex grow flex-col overflow-auto">
          {[
            ...channels.filter((channel) => channel.isJoined),
            ...channels.filter((channel) => !channel.isJoined),
          ].map((channel, index) => (
            <ChannelCard
              key={channel.id}
              title={channel.name}
              isLabeled={channel.type === "PRIVATE"}
              isHovered={index === channelIndex}
              isJoined={channel.isJoined}
              isOwner={channel.role === "OWNER"}
              isProtected={channel.type === "PROTECTED"}
              handleCardClick={() => handleCardClick(channel, index)}
              handleDeleteClick={() => handleDeleteClick(channel)}
              handleLeaveClick={() => handleLeaveClick(channel)}
            />
          ))}
        </div>
      ) : (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
          No channels.
        </div>
      )}
    </div>
  );
}

export default ChannelCardList;
