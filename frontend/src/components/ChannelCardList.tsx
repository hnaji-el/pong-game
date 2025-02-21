import React from "react";

import ChannelCard from "./ChannelCard";
import { PlusIcon } from "./Icons";
import { deleteRoom, getAllChannels, joinChannel, leaveRoom } from "../api/API";

import { ChannelType } from "../pages/Chat/types";
import Modal from "../components/Modal/Modal";
import useToggle from "../hooks/use-toggle";
import CreateChannelModal from "./modals/CreateChannelModal";
import PasswordModal from "./modals/PasswordModal";

interface PropsType {
  setChatDataBox: React.Dispatch<React.SetStateAction<ChannelType>>;
  channels: ChannelType[];
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>;
  channelIndex: number;
  setChannelIndex: React.Dispatch<React.SetStateAction<number>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChannelCardList({
  setChatDataBox,
  channels,
  setChannels,
  channelIndex,
  setChannelIndex,
  setClick,
}: PropsType) {
  const [isCreateChannelModalOpen, toggleIsCreateChannelModalOpen] =
    useToggle(false);
  const [isPasswordModalOpen, toggleIsPasswordModalOpen] = useToggle(false);

  function handleCardClick(channelData: ChannelType, index: number) {
    if (channelData.isJoined) {
      setClick(true);
      setChannelIndex(index);
      setChatDataBox(channels[index]);
    }

    if (!channelData.isJoined && channelData.type === "PROTECTED") {
      setChannelIndex(index);
      toggleIsPasswordModalOpen();
    }

    if (!channelData.isJoined && channelData.type === "PUBLIC") {
      joinChannel(
        (chnlData: ChannelType) => {
          setClick(true);
          setChannelIndex(index);
          setChatDataBox(chnlData);
          getAllChannels((chnlsData: ChannelType[]) => {
            setChannels(chnlsData);
          });
        },
        {
          id: channelData.id,
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
    <>
      {isCreateChannelModalOpen && (
        <Modal
          title="Create channel"
          handleDismiss={toggleIsCreateChannelModalOpen}
        >
          <CreateChannelModal
            setChannels={setChannels}
            handleDismiss={toggleIsCreateChannelModalOpen}
          />
        </Modal>
      )}

      {isPasswordModalOpen && (
        <Modal title="Password" handleDismiss={toggleIsPasswordModalOpen}>
          <PasswordModal
            setChatDataBox={setChatDataBox}
            channels={channels}
            setChannels={setChannels}
            channelIndex={channelIndex}
            setClick={setClick}
            handleDismiss={toggleIsPasswordModalOpen}
          />
        </Modal>
      )}

      <div className="flex grow flex-col gap-6 overflow-hidden">
        <div className="mx-3 flex items-center gap-2 lg:mx-2">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-[.3rem] bg-primary p-2"
            onClick={toggleIsCreateChannelModalOpen}
          >
            <PlusIcon edit="w-2.5 h-2.5 fill-primaryText" />
            <span className="text-sm font-light text-primaryText">
              Add channel
            </span>
          </button>
        </div>

        {channels.length ? (
          <div className="flex grow flex-col overflow-auto">
            {channels.map((channel, index) => (
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
    </>
  );
}

export default ChannelCardList;
