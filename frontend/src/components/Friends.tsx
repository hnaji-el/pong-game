import React, { useEffect, useState } from "react";
import { getFriendsOneUser } from "../api/API";
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

  if (render) {
    if (dataFriend.length)
      return (
        <div className="flex flex-col gap-12 pb-[7.6rem] pt-5 lg:pb-[2.7rem]">
          {dataFriend.map((e: TypedataFriend[], index: number) => {
            return (
              <div
                className="flex w-full flex-col gap-12 md:flex-row"
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
        <div className="text-md flex h-full items-center justify-center pb-[7.3rem] text-primaryText lg:pb-6">
          No friends.
        </div>
      );
  }
  return (
    <div className="flex h-full items-center justify-center pb-[7.3rem] text-primaryText lg:pb-6">
      <Spinner width={9} height={9} />
    </div>
  );
}

export default Friends;
