import React from "react";
import FriendMember from "../FriendMember";
import InputSearchMembers from "../InputSearchMembers";

export default function AddMember() {
  return (
    <div className="pt-6 w-full flex flex-col gap-6">
      <InputSearchMembers placeholder="Search for friend" />
      <FriendMember />
    </div>
  );
}
