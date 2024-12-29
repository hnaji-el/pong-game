import React from "react";

import { Message } from "./types";
import { MessagesContext, StateMssages } from "./Chat";

function Messages({ messages }: { messages: Message[] }) {
  const { settings } = React.useContext(StateMssages);
  const { isDm, dmIndex, channelIndex, chatDataBox } =
    React.useContext(MessagesContext);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
      const hasVerticalScrollbar =
        elementRef.current.scrollHeight > elementRef.current.clientHeight;
      if (hasVerticalScrollbar) elementRef.current.classList.add("pr-4");
      else elementRef.current.classList.remove("pr-4");
    }
  }, [dmIndex, channelIndex, chatDataBox]);

  return (
    <div ref={elementRef} className="flex h-full flex-col gap-10 overflow-auto">
      {messages.map((msg, index) => {
        if (msg.userId === settings.id) {
          return (
            <div key={index} className="flex justify-end">
              <div className="max-w-[20rem] rounded-xl rounded-tr-none bg-primary p-5 pb-3 lg:max-w-lg">
                <p className="break-words text-left text-sm font-light text-white">
                  {msg.data}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div key={index} className="flex items-start justify-start gap-2">
            {!isDm && (
              <img
                src={msg.pictureURL}
                alt="friend"
                className="h-12 w-12 rounded-full"
              />
            )}
            <div className="max-w-[20rem] rounded-xl rounded-tl-none bg-shape p-5 pb-3 lg:max-w-lg">
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
