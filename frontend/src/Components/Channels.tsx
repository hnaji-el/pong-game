import React, { useContext, useEffect, useState } from "react";
import { getAllChannels, getChannelsDm } from "../API";
import { CardChannelConversation } from "./Cards";
import { PlusIcon, SearchIcon } from "./Icons";
import { MessagesContext } from "./Routes/Messages";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Channels({ setCreateChannel }: TypeProps) {
  const messageData = useContext(MessagesContext);
  return (
    <div className="flex h-full flex-col  gap-6">
      <div className="flex items-center gap-2 mx-3 lg:mx-2">
        <div className="flex items-center rounded-md bg-shape pl-2 flex-1">
          <SearchIcon edit="w-3 fill-secondaryText relative" />
          <input
            type="text"
            placeholder="Search for channel"
            className="placeholder-secondary-text flex-1 bg-transparent py-2.5 px-2 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
          />
        </div>
        <button
          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
          onClick={() => {
            setCreateChannel(true);
          }}
        >
          <PlusIcon edit="w-2.5 h-2.5 fill-primaryText" />
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
