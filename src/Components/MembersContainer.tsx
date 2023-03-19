import React from "react";
import { CardMember } from "./Cards";

export default function MembersContainer() {
  return (
    <div className="flex flex-col max-h-[34rem] overflow-auto">
      <div className="flex flex-col gap-6">
        <CardMember role="owner" />
        <CardMember role="admin" />
      </div>
    </div>
  );
}
