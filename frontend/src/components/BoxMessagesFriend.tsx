import React from "react";

interface TypeProps {
  message: string;
  time?: string;
}

export default function BoxMessagesFriend({ message, time }: TypeProps) {
  return (
    <div className="flex justify-start">
      <div className="bg-shape max-w-[20rem] lg:max-w-lg p-5 pb-3 rounded-xl rounded-tl-none">
        <p className="text-white text-sm font-light text-left break-words ">
          {message}
        </p>
        {time ? (
          <div className="flex text-xs justify-end text-secondaryText">
            {time}
          </div>
        ) : null}
      </div>
    </div>
  );
}
