import React from "react";
import { Trophy } from "./Icons";

export default function CircleAchievements() {
  return (
    <div className="relative flex justify-center items-center rounded-full border-4 border-primary w-20 h-20">
      <Trophy edit="w-8 h-8 fill-primary" />
    </div>
  );
}
