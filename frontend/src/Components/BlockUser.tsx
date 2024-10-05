import React from "react";
import { unBlockFriend } from "../API/API";
import { CardProfileUser } from "./Cards";
import { UnblockIcon } from "./Icons";

interface TypeProps {
  setTypeUser: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  data: {
    friendsNumber: number;
    id: string;
    isBlockedByLoggedUser: boolean;
    isFriendToLoggedUser: boolean;
    nickname: string;
    pictureURL: string;
    status: string;
  };
}

export default function BlockUser({ id, setTypeUser, data }: TypeProps) {
  return (
    <section className="flex flex-col items-center gap-10  justify-center">
      <CardProfileUser data={data} />
      <div className="flex btn-profile items-center gap-3">
        <button
          className="w-36 p-2 rounded-md bg-unblock gap-2 flex items-center justify-center"
          onClick={() => {
            setTypeUser("notFriend");
            unBlockFriend(id);
          }}
        >
          <UnblockIcon edit="w-4 fill-primaryText" />
          <span className="text-primaryText text-sm">Unblock</span>
        </button>
      </div>
    </section>
  );
}
