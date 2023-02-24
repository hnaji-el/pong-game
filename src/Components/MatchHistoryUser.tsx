import React from "react";
import pictureFriend from "../assets/friend.jpg";
import { firstLetterCapital } from "../helpers";

export default function MatchHistoryUser() {
  return (
    <tr>
      <td className="flex items-center gap-3 pt-5">
        <img
          src={pictureFriend}
          alt="Player"
          className="h-10 w-10 rounded-full"
        />
        <span className="w-32 overflow-hidden whitespace-nowrap text-ellipsis text-sm text-primaryText">
          {firstLetterCapital("mouassit")}
        </span>
      </td>
      <td className="pt-5 text-center text-sm text-primaryText">5 - 0</td>
      <td className="pt-5 text-center text-sm text-primaryText">24/02/2023</td>
      <td className="pt-5 text-center">
        <span className="w-full rounded-sm bg-winBadge px-2  text-sm text-textWinBadge sm:px-8">
          WIN
        </span>
      </td>
    </tr>
  );
}
