import React from "react";
import { CardAchievments } from "./Cards";

export default function Achievements() {
  return (
    <div className="flex pt-10 content-profile lg:pb-10 flex-col gap-10 md:gap-16">
      <div className="flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5">
        <CardAchievments />
        <CardAchievments />
      </div>
      <div className="flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5">
        <CardAchievments />
        <CardAchievments />
      </div>
    </div>
  );
}
