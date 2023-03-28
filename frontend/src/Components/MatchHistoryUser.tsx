import React from "react";
import pictureFriend from "../assets/friend.jpg";
import { firstLetterCapital } from "../helpers";

interface TypdProps {
  data: any;
}

export default function MatchHistoryUser({ data }: TypdProps) {
  return (
    <tr>
      <td className="flex items-center gap-3 pt-5">
        <img
          src={data.pictureURL}
          alt="Player"
          className="h-10 w-10 rounded-full"
        />
        <span className="w-32 overflow-hidden whitespace-nowrap text-ellipsis text-sm text-primaryText capitalize">
          {data.nickname}
        </span>
      </td>
      <td className="pt-5 text-center text-sm text-primaryText">
        {data.score}
      </td>
      <td className="pt-5 text-center">
        {data.gameState === "WIN" ? (
          <span className="w-full rounded-sm bg-winBadge px-2  text-sm text-textWinBadge sm:px-8 uppercase">
            win
          </span>
        ) : (
          <span className="w-full rounded-sm bg-loseBadge px-2  text-sm text-textLoseBadge sm:px-8 uppercase">
            lose
          </span>
        )}
      </td>
    </tr>
  );
}
