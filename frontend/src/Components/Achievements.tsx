import React, { useEffect, useState } from "react";
import { getAchievements } from "../API";
import { CardAchievments } from "./Cards";
import Spinner from "./Spinner";

interface TypeProps {
  id?: string;
}

export default function Achievements({ id }: TypeProps) {
  const [achievements, setAchievements] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    if (id)
    getAchievements((res: any) => {
      setRender(true);
      setAchievements(res);
      }, id);
  }, []);

  if (render) {
    if (achievements)
      return (
        <div className="flex pt-5 pb-[7.6rem] lg:pb-[2.7rem] flex-col gap-10 md:gap-16">
          <div className="flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5">
            <CardAchievments />
          </div>
        </div>
      );
    else {
      return (
        <div className="h-full flex pb-[7.3rem] lg:pb-6 justify-center items-center text-primaryText text-md">
          No achievements.
        </div>
      );
    }
  }
  return (
    <div className="h-full flex pb-[7.3rem] lg:pb-6 justify-center items-center text-primaryText">
      <Spinner edit="w-9 h-9" />
    </div>
  );
}
