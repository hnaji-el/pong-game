import React, { useContext, useEffect, useState } from "react";
import { getAllChannels, getChannelsDm } from "../api/API";
import { CardChannelConversation } from "./Cards";
import { PlusIcon, SearchIcon } from "./Icons";
import { MessagesContext } from "../pages/Messages/Messages";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Channels({ setCreateChannel }: TypeProps) {
  const messageData = useContext(MessagesContext);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="mx-3 flex items-center gap-2 lg:mx-2">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-[.3rem] bg-primary p-2"
          onClick={() => {
            setCreateChannel(true);
          }}
        >
          <PlusIcon edit="w-2.5 h-2.5 fill-primaryText" />
          <span className="text-sm font-light text-primaryText">
            Add channel
          </span>
        </button>
      </div>
      {messageData.channels.length ? (
        <div className="relative flex h-full flex-col overflow-auto">
          {messageData.channels.map((e: any, index: number) => {
            return (
              <CardChannelConversation data={e} key={index} index={index} />
            );
          })}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center pb-[7.3rem] text-sm text-primaryText">
          No channels.
        </div>
      )}
    </div>
  );
}
