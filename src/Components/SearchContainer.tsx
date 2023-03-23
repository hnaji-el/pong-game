import React from "react";
import { CardSearchUser } from "./Cards";

interface TypeProps {
  data: {
    id: number;
    username: string;
    picture: string;
    friend: boolean;
  }[],
}

export default function SearchContainer({ data }: TypeProps) {
  return (
    <div className="bg-body absolute w-full top-14 rounded-lg shadow flex flex-col gap-4 py-4 max-h-[30rem] overflow-auto z-[1]">
      {data.map((e, index: number) => {
        return <CardSearchUser data={e} key={index} />;
      })}
    </div>
  );
}
