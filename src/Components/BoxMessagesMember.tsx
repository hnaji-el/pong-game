import React from "react";
import pictureUser from "../assets/user.jpg"

export default function BoxMessagesMember() {
  return (
    <div className="flex justify-start items-end gap-2">
      <img
        src={pictureUser}
        alt="Member"
        className="w-12 h-12 rounded-full"
      />
      <div className="bg-shape max-w-[20rem] lg:max-w-lg p-5 pb-3 rounded-xl rounded-bl-none">
        <p className="text-white text-sm font-light text-left break-words ">
          hey
        </p>
        <div className="flex text-xs justify-end text-secondaryText">
          12:35
        </div>
      </div>
    </div>
  );
}
