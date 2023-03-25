import React, { useContext, useEffect, useRef } from "react";
import BoxMessagesFriend from "./BoxMessagesFriend";
import BoxMessagesUser from "./BoxMessagesUser";
import { MessagesContext } from "./Routes/Messages";

interface TypeProps {
  data: any;
}

export default function ChatBox({ data }: TypeProps) {
  const chatBox = useRef<HTMLDivElement>(null);
  const messageData = useContext(MessagesContext);
  useEffect(() => {
    console.log(4);
    
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
      let hasVerticalScrollbar =
        chatBox.current.scrollHeight > chatBox.current.clientHeight;
      if (hasVerticalScrollbar) chatBox.current.classList.add("pr-4");
      else chatBox.current.classList.remove("pr-4")
    }
  }, [messageData.indexDm]);

  return (
    <div className="flex flex-col gap-10 h-full overflow-auto" ref={chatBox}>
      {data.map((e: any, index: number) => {
        if (e.type === "friend")
          return (
            <BoxMessagesFriend message={e.message} time={e.time} key={index} />
          );
        else
          return (
            <BoxMessagesUser message={e.message} time={e.time} key={index} />
          );
      })}
    </div>
  );
}
