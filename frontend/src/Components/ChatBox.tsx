import React, { useContext, useEffect, useRef } from "react";
import BoxMessagesFriend from "./BoxMessagesFriend";
import BoxMessagesMember from "./BoxMessagesMember";
import BoxMessagesUser from "./BoxMessagesUser";
import { MessagesContext } from "./Routes/Messages";

interface TypeProps {
  data: any;
}

export default function ChatBox({ data }: TypeProps) {
  const chatBox = useRef<HTMLDivElement>(null);
  const messageData = useContext(MessagesContext);
  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
      let hasVerticalScrollbar =
        chatBox.current.scrollHeight > chatBox.current.clientHeight;
      if (hasVerticalScrollbar) chatBox.current.classList.add("pr-4");
      else chatBox.current.classList.remove("pr-4");
    }
  }, [messageData.indexDm, messageData.indexChannel]);

  return (
    <div className="flex flex-col gap-10 h-full overflow-auto" ref={chatBox}>
      {data.map((e: any, index: number) => {
        if (messageData.typeDm === "chat") {
          if (e.type === "friend")
            return (
              <BoxMessagesFriend
                message={e.message}
                time={e.time}
                key={index}
              />
            );
          else
            return (
              <BoxMessagesUser message={e.message} time={e.time} key={index} />
            );
        } else {
          if (e.type === "member")
            return (
              <BoxMessagesMember
                picture={e.picture}
                message={e.message}
                time={e.time}
                key={index}
              />
            );
          else
            return (
              <BoxMessagesUser message={e.message} time={e.time} key={index} />
            );
        }
      })}
    </div>
  );
}
