import React, { useEffect, useRef } from "react";
import BoxMessagesFriend from "./BoxMessagesFriend";
import BoxMessagesUser from "./BoxMessagesUser";

export default function ChatBox() {
  const chatBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
      let hasVerticalScrollbar =
        chatBox.current.scrollHeight > chatBox.current.clientHeight;
      if (hasVerticalScrollbar) chatBox.current.classList.add("pr-4");
    }
  }, []);

  return (
    <div className="flex flex-col gap-10 h-full overflow-auto" ref={chatBox}>
      <BoxMessagesFriend />
      <BoxMessagesUser />
      <BoxMessagesFriend />
      <BoxMessagesUser />
      <BoxMessagesFriend />
      <BoxMessagesUser />
      <BoxMessagesFriend />
      <BoxMessagesUser />
      <BoxMessagesFriend />
      <BoxMessagesUser />
      <BoxMessagesFriend />
      <BoxMessagesUser />
    </div>
  );
}
