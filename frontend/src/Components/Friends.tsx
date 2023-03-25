import React, { useEffect, useState } from "react";
import { getFriendsOneUser } from "../API";
import { CardUser } from "./Cards";

interface TypeProps {
  id?: string;
}

interface TypedataFriend {
  id: string;
  nickname: string;
  pictureURL: string;
}

function Friends({ id }: TypeProps) {
  const [dataFreind,setDataFriend] = useState<TypedataFriend[]>([])
  useEffect(() => {
    if (id) getFriendsOneUser((res: TypedataFriend[]) => {
      setDataFriend(res);
    },id);
  }, [id]);
  return (
    <div className="flex pt-5 pb-[7.6rem] lg:pb-[2.7rem] flex-col gap-12">
      <div className="flex w-full flex-col md:flex-row gap-12">
        {
          dataFreind.map((e,index) => {
            return <CardUser data={e} key={index}/>
          })
        }
      </div>
    </div>
  );
}

export default Friends;
