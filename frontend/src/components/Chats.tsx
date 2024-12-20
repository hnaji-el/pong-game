import React, { useContext, useEffect, useState } from "react";
import { CardConversation } from "./Cards";
import { MessagesContext } from "../pages/Messages/Messages";
import Spinner from "./Spinner";

export default function Chats() {
  const conversations = useContext(MessagesContext);
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    setRender(true);
  }, []);
  if (render)
    return (
      <div className="flex h-full flex-col gap-6">
        <div className="relative flex h-full flex-col overflow-auto">
          {conversations.dms.length ? (
            conversations.dms.map((e: any, index: number) => {
              return <CardConversation data={e} key={index} index={index} />;
            })
          ) : (
            <div className="flex h-full items-center justify-center pb-[7.3rem] text-sm text-primaryText">
              No messages.
            </div>
          )}
        </div>
      </div>
    );
  else
    return (
      <div className="flex h-full items-center justify-center pb-[7.3rem] text-primaryText">
        <Spinner size={36} />
      </div>
    );
}
