import React, { useContext } from "react";
import { addFriend, getOneUser } from "../API/API";
import { AddFriendIcon } from "./Icons";
import { UpdateDataProfileUser } from "./Routes/ProfileUser";

interface TypeProps {
  id: string;
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function BtnAddFriend({ id, setTypeUser }: TypeProps) {
  const update = useContext(UpdateDataProfileUser);

  return (
    <button
      className="w-36 p-2 rounded-md bg-primary gap-2 flex items-center justify-center"
      onClick={async () => {
        setTypeUser("friend");
        await addFriend(id);
        getOneUser((res: any) => {
          update.setDataUser(res);
        }, id);
      }}
    >
      <AddFriendIcon edit="w-5 fill-primaryText" />
      <span className="text-primaryText text-sm">Add friend</span>
    </button>
  );
}
