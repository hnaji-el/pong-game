import React, { useContext, useEffect, useState,createContext } from "react";
import { getFriendChannel } from "../../API";
import FriendMember from "../FriendMember";
import { ExclamationIcon } from "../Icons";
import InputSearchMembers from "../InputSearchMembers";
import { MessagesContext } from "../Routes/Messages";
import Spinner from "../Spinner";


export const AddMemberContext = createContext<any>({});

export default function AddMember() {
  const messageData = useContext(MessagesContext);
  const [friend, setFriend] = useState<any>([]);
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    getFriendChannel((res: any) => {
      setFriend(res);
      setRender(true);
    }, messageData.dataChatBox.name);
  }, [friend]);
  if (render) {
    if (friend.length) {
      return (
        <AddMemberContext.Provider value={{setFriend:setFriend}}>
          <div className="pt-6 w-full flex flex-col gap-6">
            <InputSearchMembers placeholder="Search for friend" />
            <FriendMember data={friend} />
          </div>
        </AddMemberContext.Provider>
      );
    }
    return (
      <div className="p-8 pb-[1rem] w-full flex gap-1 text-sm text-secondaryText justify-center item-center">
        <ExclamationIcon edit="w-5 h-4 fill-secondaryText" />
        No friends available to add.
      </div>
    );
  } else
    return (
      <div className="p-8 pb-[1rem] w-full flex gap-1 text-sm text-secondaryText justify-center item-center">
        <Spinner edit="w-9 h-9" />
      </div>
    );
}
