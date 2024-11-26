import React from "react";
import { CardFriendMember } from "./Cards";

interface TypeProps {
  data: any;
}

export default function MembersContainer({ data }: TypeProps) {
  return (
    <div className="flex flex-col max-h-[34rem] overflow-auto">
      <div className="flex flex-col gap-6">
        {data.map((e: any, index: number) => {
          return <CardFriendMember data={e} key={index} />;
        })}
      </div>
    </div>
  );
}
