import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import ChannelCard from "./ChannelCard";
import { Channel, Status } from "../pages/Chat/types";
import useToggle from "../hooks/use-toggle";
import Modal from "./Modal/Modal";
import PasswordModal from "./modals/PasswordModal";
import { deleteRoom, joinChannel, leaveRoom } from "../api/API";
import Spinner from "./Spinner";

interface PropsType {
  title: string;
  channels: Channel[];
  status: Status;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChannelCardList({ title, channels, status, setToggle }: PropsType) {
  const [isPasswordModalOpen, toggleIsPasswordModalOpen] = useToggle(false);

  const navigate = useNavigate();
  const { chatId } = useParams();

  const [nextChatId, setNextChatId] = React.useState("");

  function handleCardClick(channel: Channel) {
    if (channel.isJoined) {
      setToggle(true);
      // navigate(`/chat/${channel.id}`);
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
            setToggle(true);
            // navigate(`/chat/${channel.id}`);
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
            setToggle={setToggle}
            handleDismiss={toggleIsPasswordModalOpen}
          />
        </Modal>
      )}

      <h3 className="pl-[10px] font-bold capitalize text-white">{title}</h3>

      {status === "loading" && (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
          <Spinner size={40} />
        </div>
      )}

      {status === "error" && (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm capitalize text-primaryText">
          something went wrong
        </div>
      )}

      {status === "success" &&
        (channels.length ? (
          <div className="flex grow flex-col overflow-auto">
            {channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                id={channel.id}
                title={channel.name}
                isLabeled={channel.type === "PRIVATE"}
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
          <div className="flex grow items-center justify-center text-sm text-primaryText">
            no channels.
          </div>
        ))}
    </>
  );
}

export default ChannelCardList;
