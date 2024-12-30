import React from "react";

import { ExclamationIcon } from "../Icons";
import MembersContainer from "../MembersContainer";
import { MessagesContext } from "../../pages/Chat/Chat";
import Spinner from "../Spinner";

import { getMembersChannel } from "../../api/API";

export const MembersContext = React.createContext<any>({});

// TODO: check for [TypeError: cannot read properties of undefined `name`]
function MembersModal() {
  const messageData = React.useContext(MessagesContext);
  const [members, setMembers] = React.useState<any>([]);
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    getMembersChannel((res: any) => {
      setMembers(res);
      setRender(true);
    }, messageData.chatDataBox.name);
  }, [messageData.chatDataBox.name]);

  if (!render) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <Spinner size={36} />
      </div>
    );
  }

  return members.length ? (
    <MembersContext.Provider value={{ setMembers: setMembers }}>
      <div className="flex w-full flex-col gap-6 pt-5">
        <MembersContainer data={members} />
      </div>
    </MembersContext.Provider>
  ) : (
    <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
      <ExclamationIcon edit="w-5 h-4 fill-secondaryText relative top-[.1rem]" />
      You are the only one in this room.
    </div>
  );
}

export default MembersModal;