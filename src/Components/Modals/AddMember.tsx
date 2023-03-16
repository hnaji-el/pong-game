import React from "react";
import InputSearchMembers from "../InputSearchMembers";
import MembersContainer from "../MembersContainer";

export default function AddMember() {
  return (
    <div className="pt-6 w-full flex flex-col gap-6">
      <InputSearchMembers placeholder="Search for friend" />
      <MembersContainer />
    </div>
  );
}
