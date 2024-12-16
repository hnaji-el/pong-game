import React, { createContext, useContext, useEffect, useState } from "react";
import { getMembersChannel } from "../../api/API";
import { ExclamationIcon } from "../Icons";
import MembersContainer from "../MembersContainer";
import { MessagesContext } from "../routes/Messages";
import Spinner from "../Spinner";

export const MembersContext = createContext<any>({});
export default function Members() {
  const messageData = useContext(MessagesContext);
  const [members, setMembers] = useState<any>([]);
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    getMembersChannel((res: any) => {
      setMembers(res);
      setRender(true);
    }, messageData.dataChatBox.name);
  }, [messageData.dataChatBox.name]);

  if (render) {
    if (members.length)
      return (
        <MembersContext.Provider value={{ setMembers: setMembers }}>
          <div className="flex w-full flex-col gap-6 pt-5">
            <MembersContainer data={members} />
          </div>
        </MembersContext.Provider>
      );
    return (
      <div className="item-center flex w-full justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <ExclamationIcon edit="w-5 h-4 fill-secondaryText relative top-[.1rem]" />
        You are the only one in this room.
      </div>
    );
  } else
    return (
      <div className="item-center flex w-full justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <Spinner edit="w-9 h-9" />
      </div>
    );
}
