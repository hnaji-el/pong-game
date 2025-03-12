import React from "react";

import ChannelCard from "./ChannelCard";
import { PlusIcon } from "./Icons";
import { deleteRoom, joinChannel, leaveRoom } from "../api/API";
import { Channel } from "../pages/Chat/types";
import Modal from "../components/Modal/Modal";
import useToggle from "../hooks/use-toggle";
import CreateChannelModal from "./modals/CreateChannelModal";
import PasswordModal from "./modals/PasswordModal";
import { useParams } from "react-router-dom";

interface PropsType {
  channels: Channel[];
  isLoading: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChannelCardList({ channels, isLoading, setClick }: PropsType) {
  const { chatId } = useParams();
  const [isCreateChannelModalOpen, toggleIsCreateChannelModalOpen] =
    useToggle(false);
  const [isPasswordModalOpen, toggleIsPasswordModalOpen] = useToggle(false);

  function handleCardClick(channelData: Channel) {
    if (channelData.isJoined) {
      setClick(true);
    } else {
      if (channelData.type === "PROTECTED") {
        toggleIsPasswordModalOpen();
      }

      if (channelData.type === "PUBLIC") {
        joinChannel(
          () => {
            setClick(true);
          },
          {
            id: channelData.id,
            type: "PUBLIC",
          },
        );
      }
    }
  }

  async function handleDeleteClick(channelData: Channel) {
    await deleteRoom(channelData.name);
  }

  async function handleLeaveClick(channelData: Channel) {
    await leaveRoom(channelData.name);
  }

  return (
    <>
      {isCreateChannelModalOpen && (
        <Modal
          title="create channel"
          handleDismiss={toggleIsCreateChannelModalOpen}
        >
          <CreateChannelModal handleDismiss={toggleIsCreateChannelModalOpen} />
        </Modal>
      )}

      {isPasswordModalOpen && (
        <Modal title="password" handleDismiss={toggleIsPasswordModalOpen}>
          <PasswordModal
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

        {!isLoading ? (
          channels.length ? (
            <div className="flex grow flex-col overflow-auto">
              {channels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  title={channel.name}
                  isLabeled={channel.type === "PRIVATE"}
                  isHovered={channel.id === chatId}
                  isJoined={channel.isJoined}
                  isOwner={channel.role === "OWNER"}
                  isProtected={channel.type === "PROTECTED"}
                  handleCardClick={() => handleCardClick(channel)}
                  handleDeleteClick={() => handleDeleteClick(channel)}
                  handleLeaveClick={() => handleLeaveClick(channel)}
                />
              ))}
            </div>
          ) : (
            <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
              No channels.
            </div>
          )
        ) : (
          <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
            loading ...
          </div>
        )}
      </div>
    </>
  );
}

export default ChannelCardList;
