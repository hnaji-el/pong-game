import React from "react";

import FriendMember from "../FriendMember";
import { ExclamationIcon } from "../Icons";
import Spinner from "../Spinner";
import { getFriendChannel } from "../../api/API";

import { MessagesContext } from "../../pages/Chat/Chat";

export const AddMemberContext = React.createContext<any>({});

function AddMemberModal() {
  const messageData = React.useContext(MessagesContext);
  const [friend, setFriend] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true); 

  React.useEffect(() => {
    getFriendChannel((res: any) => {
      setFriend(res);
      setIsLoading(false);
    }, messageData.chatDataBox.name);
  }, [messageData.chatDataBox.name]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <Spinner size={36} />
      </div>
    );
  }

  return friend.length ? (
    <AddMemberContext.Provider value={{ setFriend: setFriend }}>
      <div className="flex w-full flex-col gap-6 pt-5">
        <FriendMember data={friend} />
      </div>
    </AddMemberContext.Provider>
  ) : (
    <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
      <ExclamationIcon edit="w-5 h-4 fill-secondaryText" />
      No friends available to add.
    </div>
  );
}

export default AddMemberModal;
