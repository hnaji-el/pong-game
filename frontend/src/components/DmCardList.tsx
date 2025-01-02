import React from "react";

import DmCard from "./DmCard";
import { blockFriend, getAllDms } from "../api/API";

import { globalSocket } from "../utilities/socket";
import { DmType } from "../pages/Chat/types";
import { StateMssages, MessagesContext } from "../pages/Chat/Chat";

function DmCardList() {
  const { setClick, settings } = React.useContext(StateMssages);
  const { dms, dmIndex, setDmIndex, setChatDataBox, setDms } =
    React.useContext(MessagesContext);

  function handleCardClick(index: number) {
    setDmIndex(index);
    setChatDataBox(dms[index]);
    setClick(true);
  }

  function handleInviteToPlayClick(userId: string) {
    globalSocket.emit("inviteToPlay", {
      sender: settings,
      receiverId: userId,
    });
  }

  async function handleBlockClick(userId: string) {
    await blockFriend(userId);
    getAllDms((dmsData: DmType[]) => {
      setDms(dmsData);
    });
  }

  return (
    <div className="flex grow flex-col gap-[24px] overflow-auto">
      {dms.length ? (
        (dms as DmType[]).map((dm, index) => (
          <DmCard
            key={dm.id}
            avatar={dm.pictureURL}
            title={dm.nickname}
            isHovered={index === dmIndex}
            handleCardClick={() => handleCardClick(index)}
            handleInviteToPlayClick={() => handleInviteToPlayClick(dm.id)}
            handleBlockClick={() => handleBlockClick(dm.id)}
          />
        ))
      ) : (
        <div className="flex grow items-center justify-center pb-[7.3rem] text-sm text-primaryText">
          No messages.
        </div>
      )}
    </div>
  );
}

export default DmCardList;
