import React, { useEffect, useState } from "react";
import { getMatchHistory } from "../api/API";
import MatchHistoryUser from "./MatchHistoryUser";
import Spinner from "./Spinner";

interface TypdProps {
  id?: string;
}

export default function MatchHistory({ id }: TypdProps) {
  const [matchHistory, setMatchHistory] = useState<[]>([]);
  const [render, setRender] = useState<boolean>(false);
  useEffect(() => {
    if (id)
      getMatchHistory((res: any) => {
        setMatchHistory(res);
        setRender(true);
      }, id);
  }, [id]);

  if (render) {
    if (matchHistory.length)
      return (
        <div className="flex pb-[7.6rem] pt-5 lg:pb-[2.7rem]">
          <table className="table w-full">
            <thead>
              <tr className="rounded-xl bg-body font-medium text-primaryText shadow">
                <th className="rounded-xl p-4 text-left">Players</th>
                <th className="p-4">Score</th>
                <th className="rounded-xl p-4">Stat</th>
              </tr>
            </thead>
            <tbody>
              {matchHistory.map((e: any, index: number) => {
                return <MatchHistoryUser data={e} key={index} />;
              })}
            </tbody>
          </table>
        </div>
      );
    else
      return (
        <div className="text-md flex h-full items-center justify-center pb-[7.3rem] text-primaryText lg:pb-6">
          No Matches.
        </div>
      );
  }
  return (
    <div className="flex h-full items-center justify-center pb-[7.3rem] text-primaryText lg:pb-6">
      <Spinner size={36} />
    </div>
  );
}
