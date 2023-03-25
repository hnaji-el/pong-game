import React, { useEffect, useState } from "react";
import { getFriendsOneUser } from "../API";
import { CardUser } from "./Cards";
import Spinner from "./Spinner";

interface TypeProps {
  id?: string;
}

interface TypedataFriend {
  id: string;
  nickname: string;
  pictureURL: string;
}

function Friends({ id }: TypeProps) {
  const [dataFriend, setDataFriend] = useState<TypedataFriend[][]>([]);
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    if (id)
      getFriendsOneUser((res: TypedataFriend[]) => {
        let data: TypedataFriend[] = [];
        let fill: TypedataFriend[][] = [];
        let count = 0;
        res.forEach((element: TypedataFriend) => {
          data.push(element);
          count++;
          if (count >= 3) {
            fill.push(data);
            count = 0;
            data = [];
          }
        });
        if (data.length) fill.push(data);
        setDataFriend(fill);
        setRender(true);
      }, id);
  }, [id]);

  if (render)
  {
    if (dataFriend.length)
    return (
      <div className="flex pt-5 pb-[7.6rem] lg:pb-[2.7rem] flex-col gap-12">
        {dataFriend.map((e: TypedataFriend[], index: number) => {
          return (
            <div
              className="flex w-full flex-col md:flex-row gap-12"
              key={index}
            >
              {e.map((element: TypedataFriend, index: number) => {
                return <CardUser data={element} key={index} />;
              })}
            </div>
          );
        })}
      </div>
    );
  else
    return (
      <div className="h-full flex pb-[7.3rem] lg:pb-6 justify-center items-center text-primaryText text-md">
        No friends.
      </div>
    );
  }
  return (
      <div className="h-full flex pb-[7.3rem] lg:pb-6 justify-center items-center text-primaryText">
        <Spinner edit="w-9 h-9"/>
      </div>
  );
}

export default Friends;
