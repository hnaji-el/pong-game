import React from "react";

import DmCard from "./DmCard";
import { blockFriend, getAllDms } from "../api/API";

import { globalSocket } from "../utilities/socket";
import { DmType } from "../pages/Chat/types";
import { UserType } from "../api/types";

interface PropsType {
  loggedUserData: UserType;
  setChatDataBox: React.Dispatch<React.SetStateAction<DmType>>;
  dmIndex: number;
  setDmIndex: React.Dispatch<React.SetStateAction<number>>;
  dms: DmType[];
  setDms: React.Dispatch<React.SetStateAction<DmType[]>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function DmCardList({
  loggedUserData,
  setChatDataBox,
  dmIndex,
  setDmIndex,
  dms,
  setDms,
  setClick,
}: PropsType) {
  function handleCardClick(index: number) {
    setDmIndex(index);
    setChatDataBox(dms[index]);
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
    getAllDms((dmsData: DmType[]) => {
      setDms(dmsData);
    });
  }

  return (
    <div className="flex grow flex-col gap-[24px] overflow-auto">
      {dms.length ? (
        dms.map((dm, index) => (
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
