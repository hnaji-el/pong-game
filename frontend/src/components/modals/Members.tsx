import React from "react";

import { ExclamationIcon } from "../Icons";
import MembersContainer from "../MembersContainer";
import { MessagesContext } from "../../pages/Messages";
import Spinner from "../Spinner";

import { getMembersChannel } from "../../api/API";

export const MembersContext = React.createContext<any>({});

// TODO: check for [TypeError: cannot read properties of undefined `name`]
function Members() {
  const messageData = React.useContext(MessagesContext);
  const [members, setMembers] = React.useState<any>([]);
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
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
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <ExclamationIcon edit="w-5 h-4 fill-secondaryText relative top-[.1rem]" />
        You are the only one in this room.
      </div>
    );
  } else
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <Spinner width={9} height={9} />
      </div>
    );
}

export default Members;
