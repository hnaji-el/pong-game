import React, { useEffect, useState } from "react";
import { getAchievements } from "../api/API";
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
  }, [id]);

  if (render) {
    if (achievements)
      return (
        <div className="flex flex-col gap-10 pb-[7.6rem] pt-5 md:gap-16 lg:pb-[2.7rem]">
          <div className="flex w-full flex-col items-center justify-around gap-10 md:flex-row md:gap-5">
            <CardAchievments />
          </div>
        </div>
      );
    else {
      return (
        <div className="text-md flex h-full items-center justify-center pb-[7.3rem] text-primaryText lg:pb-6">
          No achievements.
        </div>
      );
    }
  }
  return (
    <div className="flex h-full items-center justify-center pb-[7.3rem] text-primaryText lg:pb-6">
      <Spinner width={9} height={9} />
    </div>
  );
}
