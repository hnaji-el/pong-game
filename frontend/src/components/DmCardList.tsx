import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import DmCard from "./DmCard";
import { blockFriend } from "../api/API";
import { globalSocket } from "../utilities/socket";
import { Dm, Status } from "../pages/Chat/types";
import { UserType } from "../api/types";

interface PropsType {
  dms: Dm[];
  roomsStatus: Status;
  loggedUserData: UserType;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function DmCardList({ dms, roomsStatus, loggedUserData, setClick }: PropsType) {
  const { chatId } = useParams();
  const navigate = useNavigate();

  function handleCardClick(cardChatId: string) {
    setClick(true);
    navigate(`/chat/${cardChatId}`);
  }

  function handleInviteToPlayClick(userId: string) {
    globalSocket.emit("inviteToPlay", {
      sender: loggedUserData,
      receiverId: userId,
    });
  }

  function handleBlockClick(userId: string) {
    blockFriend(userId);

    // TODO: [CHAT] adjust the logic when the user blocked
  }

  return (
    <div className="flex grow flex-col gap-[24px] overflow-auto">
      {roomsStatus === "loading" && (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
          loading...
        </div>
      )}

      {roomsStatus === "error" && (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm capitalize text-primaryText">
          something went wrong
        </div>
      )}

      {roomsStatus === "success" &&
        (dms.length ? (
          dms.map((dm) => (
            <DmCard
              key={dm.id}
              avatar={dm.pictureURL}
              title={dm.nickname}
              isHovered={dm.id === chatId}
              handleCardClick={() => handleCardClick(dm.id)}
              handleInviteToPlayClick={() => handleInviteToPlayClick(dm.userId)}
              handleBlockClick={() => handleBlockClick(dm.userId)}
            />
          ))
        ) : (
          <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
            no messages.
          </div>
        ))}
    </div>
  );
}

export default DmCardList;
