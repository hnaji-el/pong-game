import React from "react";

import { CardConversation } from "./Cards";
import { MessagesContext } from "../pages/Messages/Messages";
import Spinner from "./Spinner";

function Chats() {
  const conversations = React.useContext(MessagesContext);
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  if (!render) {
    return (
      <div className="flex h-full items-center justify-center pb-[7.3rem] text-primaryText">
        <Spinner size={36} />
      </div>
    );
  }

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
}

export default Chats;
