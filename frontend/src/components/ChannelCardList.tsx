import React from "react";

import ChannelCard from "./ChannelCard";
import { Channel, Status } from "../pages/Chat/types";
import useToggle from "../hooks/use-toggle";
import Modal from "./Modal/Modal";
import PasswordModal from "./modals/PasswordModal";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRoom, joinChannel, leaveRoom } from "../api/API";

interface PropsType {
  title: string;
  channels: Channel[];
  roomsStatus: Status;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChannelCardList({
  title,
  channels,
  roomsStatus,
  setClick,
}: PropsType) {
  const [isPasswordModalOpen, toggleIsPasswordModalOpen] = useToggle(false);

  const navigate = useNavigate();
  const { chatId } = useParams();

  const [nextChatId, setNextChatId] = React.useState("");

  function handleCardClick(channel: Channel) {
    if (channel.isJoined) {
      setClick(true);
      navigate(`/chat/${channel.id}`);
    } else {
      if (channel.type === "PROTECTED") {
        setNextChatId(channel.id);
        toggleIsPasswordModalOpen();
      }

      if (channel.type === "PUBLIC") {
        joinChannel(
          {
            id: channel.id,
            type: "PUBLIC",
          },
          () => {
            setClick(true);
            navigate(`/chat/${channel.id}`);
          },
        );
      }
    }
  }

  function handleDeleteClick(channel: Channel) {
    deleteRoom(channel.name);

    if (channel.id === chatId) navigateToNewChat(channel);
  }

  function handleLeaveClick(channel: Channel) {
    leaveRoom(channel.name);

    if (channel.id === chatId) navigateToNewChat(channel);
  }

  function navigateToNewChat(channel: Channel) {
    if (channels.length === 1) {
      navigate("/chat");
    } else {
      const deletedChatIndex = channels.findIndex(
        (element) => element.id === channel.id,
      );
      navigate(
        `/chat/${deletedChatIndex === 0 ? channels[1].id : channels[deletedChatIndex - 1].id}`,
      );
    }
  }

  return (
    <>
      {isPasswordModalOpen && (
        <Modal title="password" handleDismiss={toggleIsPasswordModalOpen}>
          <PasswordModal
            nextChatId={nextChatId}
            setClick={setClick}
            handleDismiss={toggleIsPasswordModalOpen}
          />
        </Modal>
      )}

      <h3 className="capitalize">{title}</h3>

      {roomsStatus === "loading" && (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
          loading...
        </div>
      )}

      {roomsStatus && "error" && (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm capitalize text-primaryText">
          something went wrong
        </div>
      )}

      {roomsStatus === "success" &&
        (channels.length ? (
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
            no channels.
          </div>
        ))}
    </>
  );
}

export default ChannelCardList;
