import React, { useContext } from "react";
import { addFriend, getOneUser } from "../api/API";
import { AddFriendIcon } from "./Icons";
import { UpdateDataProfileUser } from "../pages/ProfileUser/ProfileUser";

interface TypeProps {
  id: string;
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function BtnAddFriend({ id, setTypeUser }: TypeProps) {
  const update = useContext(UpdateDataProfileUser);

  return (
    <button
      className="flex w-36 items-center justify-center gap-2 rounded-md bg-primary p-2"
      onClick={async () => {
        setTypeUser("friend");
        await addFriend(id);
        getOneUser((res: any) => {
          update.setDataUser(res);
        }, id);
      }}
    >
      <AddFriendIcon edit="w-5 fill-primaryText" />
      <span className="text-sm text-primaryText">Add friend</span>
    </button>
  );
}
