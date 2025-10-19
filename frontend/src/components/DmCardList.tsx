import React from "react";

import DmCard from "./DmCard";
import { blockFriend } from "../api/API";
import { globalSocket } from "../utilities/socket";
import { Dm, Status } from "../pages/Chat/types";
import { UserType } from "../api/types";
import Spinner from "./Spinner";

interface PropsType {
  dms: Dm[];
  status: Status;
  loggedUserData: UserType;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function DmCardList({ dms, status, loggedUserData, setToggle }: PropsType) {
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
        (dms.length ? (
          dms.map((dm) => (
            <DmCard
              key={dm.id}
              id={dm.id}
              avatar={dm.pictureURL}
              title={dm.nickname}
              handleCardClick={() => setToggle(true)}
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
