import React from "react";
import { CardSearchUser } from "./Cards";

export default function SearchContainer() {
  return (
    <div className="bg-body absolute w-full shadow top-14 rounded-lg flex flex-col gap-4 py-4 max-h-[30rem] overflow-auto z-[1]">
      <CardSearchUser type="user"/>
      <CardSearchUser  type="friend"/>
      <CardSearchUser  type="friend"/>
      <CardSearchUser  type="friend"/>
      <CardSearchUser  type="friend"/>
      <CardSearchUser  type="friend"/>
      <CardSearchUser  type="friend"/>
      <CardSearchUser  type="friend"/>
    </div>
  );
}
