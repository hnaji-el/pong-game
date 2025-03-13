import React from "react";

import { useParams } from "react-router-dom";

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

  function handleCardClick() {
    setClick(true);
  }

  function handleInviteToPlayClick(userId: string) {
    globalSocket.emit("inviteToPlay", {
      sender: loggedUserData,
      receiverId: userId,
    });
  }

  async function handleBlockClick(userId: string) {
    await blockFriend(userId);
  }

  return (
    <div className="flex grow flex-col gap-[24px] overflow-auto">
      {roomsStatus === "loading" && (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
          loading...
        </div>
      )}

      {roomsStatus === "error" && (
        <div className="flex capitalize grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
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
              handleCardClick={() => handleCardClick()}
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
