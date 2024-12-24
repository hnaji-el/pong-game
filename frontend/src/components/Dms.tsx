import React from "react";


import { MessagesContext } from "../pages/Messages/Messages";
import DmCard from "./DmCard";
import { DmType } from "../pages/Messages/types";

function Dms() {
  const conversations = React.useContext(MessagesContext);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="relative flex h-full flex-col overflow-auto">
        {conversations.dms.length ? (
          conversations.dms.map((dm: DmType, index: number) => {
            return <DmCard data={dm} key={dm.id} index={index} />;
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

export default Dms;
