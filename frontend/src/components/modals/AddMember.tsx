import React, { useContext, useEffect, useState, createContext } from "react";
import { getFriendChannel } from "../../api/API";
import FriendMember from "../FriendMember";
import { ExclamationIcon } from "../Icons";
import { MessagesContext } from "../routes/Messages";
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
  }, [messageData.dataChatBox.name]);

  if (render) {
    if (friend.length) {
      return (
        <AddMemberContext.Provider value={{ setFriend: setFriend }}>
          <div className="flex w-full flex-col gap-6 pt-5">
            <FriendMember data={friend} />
          </div>
        </AddMemberContext.Provider>
      );
    }
    return (
      <div className="item-center flex w-full justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <ExclamationIcon edit="w-5 h-4 fill-secondaryText" />
        No friends available to add.
      </div>
    );
  } else
    return (
      <div className="item-center flex w-full justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <Spinner edit="w-9 h-9" />
      </div>
    );
}
