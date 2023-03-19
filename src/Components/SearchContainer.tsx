import React from "react";
import { CardSearchUser } from "./Cards";

export default function SearchContainer() {
  return (
    <div className="absolute w-full top-14 rounded-lg">
      <div className="bg-body shadow flex flex-col gap-4 py-4 max-h-[30rem] overflow-auto z-[1]">
        <CardSearchUser type="friend" />
        <CardSearchUser type="friend" />
        <CardSearchUser type="friend" />
        <CardSearchUser type="friend" />
        <CardSearchUser type="friend" />
        <CardSearchUser type="friend" />
        <CardSearchUser type="friend" />
        <CardSearchUser type="friend" />
      </div>
    </div>
  );
}
