import React, { useContext, useEffect, useState } from "react";
import { CardConversation } from "./Cards";
import { MessagesContext } from "./routes/Messages";
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
          {conversations.dataDm.length ? (
            conversations.dataDm.map((e: any, index: number) => {
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
        <Spinner width={9} height={9} />
      </div>
    );
}
