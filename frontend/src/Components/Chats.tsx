import React, { useContext, useEffect, useState } from "react";
import { getAllChannels, getDmUsers } from "../api/API";
import { CardConversation } from "./Cards";
import { SearchIcon } from "./Icons";
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
      <div className="flex h-full flex-col  gap-6">
        <div className="flex h-full relative flex-col overflow-auto">
          {conversations.dataDm.length ? (
            conversations.dataDm.map((e: any, index: number) => {
              return <CardConversation data={e} key={index} index={index} />;
            })
          ) : (
            <div className="h-full flex pb-[7.3rem] justify-center items-center text-primaryText text-sm">
              No messages.
            </div>
          )}
        </div>
      </div>
    );
  else
    return (
      <div className="h-full flex pb-[7.3rem] justify-center items-center text-primaryText">
        <Spinner edit="w-9 h-9" />
      </div>
    );
}
