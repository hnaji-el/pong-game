import React from "react";
import { CardSearchUser } from "./Cards";

interface TypeProps {
  data: {
    id: number;
    nickname: string;
    pictureURL: string;
    friend: boolean;
  }[];
}

export default function SearchContainer({ data }: TypeProps) {
  if (data.length > 1)
    return (
      <div className="bg-body absolute w-full top-14 rounded-lg shadow flex flex-col gap-4 py-4 max-h-[30rem] overflow-auto z-[1]">
        {data.map((e, index: number) => {
          return <CardSearchUser data={e} key={index} />;
        })}
      </div>
    );
  else
    return (
      <div className="absolute w-full top-14">
        <div className="bg-body rounded-lg shadow flex flex-col gap-4 py-4 max-h-[30rem] overflow-auto z-[1]">
          {data.map((e, index: number) => {
            return <CardSearchUser data={e} key={index} />;
          })}
        </div>
      </div>
    );
}
