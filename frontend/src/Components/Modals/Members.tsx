import React, { createContext, useContext, useEffect, useState } from "react";
import { getMembersChannel } from "../../API/API";
import { ExclamationIcon } from "../Icons";
import InputSearchMembers from "../InputSearchMembers";
import MembersContainer from "../MembersContainer";
import { MessagesContext } from "../Routes/Messages";
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
  }, []);
  if (render) {
    if (members.length)
      return (
        <MembersContext.Provider value={{ setMembers: setMembers }}>
          <div className="pt-5 w-full flex flex-col gap-6">
            <MembersContainer data={members} />
          </div>
        </MembersContext.Provider>
      );
    return (
      <div className="p-8 pb-[1rem] w-full flex gap-1 text-sm text-secondaryText justify-center item-center">
        <ExclamationIcon edit="w-5 h-4 fill-secondaryText relative top-[.1rem]" />
        You are the only one in this room.
      </div>
    );
  } else
    return (
      <div className="p-8 pb-[1rem] w-full flex gap-1 text-sm text-secondaryText justify-center item-center">
        <Spinner edit="w-9 h-9" />
      </div>
    );
}
