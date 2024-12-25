import React from "react";

import ChannelCard from "./ChannelCard";
import { PlusIcon } from "./Icons";
import { ChannelType } from "../pages/Messages/types";

import { MessagesContext } from "../pages/Messages/Messages";

function ChannelCardList({
  setIsCreateChannelBtnClicked,
}: {
  setIsCreateChannelBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const messageData = React.useContext(MessagesContext);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="mx-3 flex items-center gap-2 lg:mx-2">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-[.3rem] bg-primary p-2"
          onClick={() => {
            setIsCreateChannelBtnClicked(true);
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
          {(messageData.channels as ChannelType[]).map((channel, index) => {
            return (
              <ChannelCard
                title={channel.name}
                isLabeled={channel.type === "PRIVATE"}
                data={channel}
                key={index}
                index={index}
              />
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

export default ChannelCardList;
