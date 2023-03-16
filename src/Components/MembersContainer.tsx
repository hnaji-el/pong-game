import React from "react";
import { CardFriendMember } from "./Cards";

export default function MembersContainer() {
  return (
    <div className="flex flex-col gap-6 max-h-[34rem] overflow-auto">
      <div className="flex flex-col gap-5">
        <CardFriendMember />
        <CardFriendMember />
        <CardFriendMember />
      </div>
    </div>
  );
}
