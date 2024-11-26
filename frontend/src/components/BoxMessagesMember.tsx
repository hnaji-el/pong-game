import React from "react";
import pictureUser from "../assets/user.jpg";

interface TypeProps {
  picture: string;
  message: string;
  time?: string;
}

export default function BoxMessagesMember({
  picture,
  message,
  time,
}: TypeProps) {
  return (
    <div className="flex justify-start items-end gap-2">
      <img src={picture} alt="Member" className="w-12 h-12 rounded-full" />
      <div className="bg-shape max-w-[20rem] lg:max-w-lg p-5 pb-3 rounded-xl rounded-bl-none">
        <p className="text-white text-sm font-light text-left break-words ">
          {message}
        </p>
        {time ? (
          <div className="flex text-xs justify-end text-secondaryText">
            time
          </div>
        ) : null}
      </div>
    </div>
  );
}
