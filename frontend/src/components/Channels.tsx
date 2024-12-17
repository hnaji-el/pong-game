import React, { useContext, useEffect, useState } from "react";
import { getAllChannels, getChannelsDm } from "../api/API";
import { CardChannelConversation } from "./Cards";
import { PlusIcon, SearchIcon } from "./Icons";
import { MessagesContext } from "../pages/Messages";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Channels({ setCreateChannel }: TypeProps) {
  const messageData = useContext(MessagesContext);

  return (
    <div className="flex h-full flex-col  gap-6">
      <div className="flex items-center gap-2 mx-3 lg:mx-2">
        <button
          className="flex w-full items-center gap-2 p-2 rounded-[.3rem] justify-center bg-primary"
          onClick={() => {
            setCreateChannel(true);
          }}
        >
          <PlusIcon edit="w-2.5 h-2.5 fill-primaryText" />
          <span className="text-primaryText text-sm font-light">
            Add channel
          </span>
        </button>
      </div>
      {messageData.channelDm.length ? (
        <div className="flex h-full relative flex-col overflow-auto">
          {messageData.channelDm.map((e: any, index: number) => {
            return (
              <CardChannelConversation data={e} key={index} index={index} />
            );
          })}
        </div>
      ) : (
        <div className="h-full flex pb-[7.3rem] justify-center items-center text-primaryText text-sm">
          No channels.
        </div>
      )}
    </div>
  );
}
