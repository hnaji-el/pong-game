import React from "react";

import { Message } from "./types";
import { MessagesContext, StateMssages } from "./Chat";

function Messages({ messages }: { messages: Message[] }) {
  const { settings } = React.useContext(StateMssages);
  const { isDm } = React.useContext(MessagesContext);

  return (
    <div className="flex h-full flex-col-reverse gap-[20px] overflow-auto px-[15px] pb-[10px] pt-[20px]">
      {messages.map((msg, index) => {
        if (msg.userId === settings.id) {
          return (
            <div key={index} className="ml-[20px] flex justify-end">
              <div className="max-w-[320px] rounded-xl rounded-tr-none bg-primary p-[15px] lg:max-w-[512px]">
                <p className="break-words text-left text-sm font-light text-white">
                  {msg.data}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="mr-[20px] flex items-start justify-start gap-2"
          >
            {!isDm && (
              <img
                src={msg.pictureURL}
                alt="friend"
                className="h-12 w-12 rounded-full"
              />
            )}
            <div className="max-w-[320px] rounded-xl rounded-tl-none bg-shape p-[15px] lg:max-w-[512px]">
              <p className="break-words text-left text-sm font-light text-white">
                {msg.data}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
