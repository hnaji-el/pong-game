import React from "react";

import DmCard from "./DmCard";
import { blockFriend, getAllDms } from "../api/API";

import { globalSocket } from "../utilities/socket";
import { DmType } from "../pages/Messages/types";
import { StateMssages, MessagesContext } from "../pages/Messages/Messages";

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
    <div className="flex h-full flex-col gap-6">
      <div className="relative flex h-full flex-col overflow-auto">
        {dms.length ? (
          (dms as DmType[]).map((dm, index) => (
            <DmCard
              key={dm.id}
              avatar={dm.picture}
              title={dm.username}
              isHovered={index === dmIndex}
              handleCardClick={() => handleCardClick(index)}
              handleInviteToPlayClick={() => handleInviteToPlayClick(dm.id)}
              handleBlockClick={() => handleBlockClick(dm.id)}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center pb-[7.3rem] text-sm text-primaryText">
            No messages.
          </div>
        )}
      </div>
    </div>
  );
}

export default DmCardList;
