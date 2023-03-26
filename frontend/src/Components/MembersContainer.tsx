import React from "react";
import { CardMember } from "./Cards";

interface TypeProps {
  data: any;
}

export default function MembersContainer({ data }: TypeProps) {
  console.log(data);

  return (
    <div
      className={`flex flex-col ${
        data.length > 3 ? "relative" : ""
      } max-h-[34rem] overflow-auto`}
    >
      <div className="flex flex-col gap-6">
        {data.map((e: any, index: number) => {
          return <CardMember data={e} role={e.role} key={index} />;
        })}
      </div>
    </div>
  );
}
