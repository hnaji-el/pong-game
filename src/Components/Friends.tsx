import React from "react";
import { CardUser } from "./Cards";
function Friends() {
  return (
    <div className="flex pt-5 pb-[7.6rem] lg:pb-[2.7rem] flex-col gap-12">
      <div className="flex w-full flex-col md:flex-row gap-12">
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
      <div className="flex w-full flex-col md:flex-row gap-12">
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
      <div className="flex w-full flex-col md:flex-row gap-12">
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
      <div className="flex w-full flex-col md:flex-row gap-12">
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
      <div className="flex w-full flex-col md:flex-row gap-12">
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
      <div className="flex w-full flex-col md:flex-row gap-12">
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
      <div className="flex w-full flex-col md:flex-row gap-12">
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
    </div>
  );
}

export default Friends;
