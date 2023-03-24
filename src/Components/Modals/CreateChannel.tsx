import React, { useState } from "react";
import { CheckIcon } from "../Icons";
import PrivateChannel from "../PrivateChannel";
import ProtectedChannel from "../ProtectedChannel";
import PublicChannel from "../PublicChannel";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateChannel({ setCreateChannel }: TypeProps) {
  const [type, setType] = useState("public");
  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col gap-11 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between lg:gap-0">
          <button
            className="bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md"
            onClick={() => {
              setType("public");
            }}
          >
            <span
              aria-label="Check"
              className={`${
                type === "public" ? "bg-primary" : "border-2 border-primary"
              } w-7 h-7 flex justify-center items-center rounded-full`}
            >
              {type === "public" ? (
                <CheckIcon edit="w-4 h-4 fill-primaryText" />
              ) : null}
            </span>
            <span className="text-primaryText text-md font-light">Public</span>
          </button>
          <button
            className="bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md"
            onClick={() => {
              setType("private");
            }}
          >
            <span
              aria-label="Check"
              className={`${
                type === "private" ? "bg-primary" : "border-2 border-primary"
              } w-7 h-7 flex justify-center items-center rounded-full`}
            >
              {type === "private" ? (
                <CheckIcon edit="w-4 h-4 fill-primaryText" />
              ) : null}
            </span>
            <span className="text-primaryText text-md font-light">Private</span>
          </button>
          <button
            className="bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md"
            onClick={() => {
              setType("protected");
            }}
          >
            <span
              aria-label="Check"
              className={`${
                type === "protected" ? "bg-primary" : "border-2 border-primary"
              } w-7 h-7 flex justify-center items-center rounded-full`}
            >
              {type === "protected" ? (
                <CheckIcon edit="w-4 h-4 fill-primaryText" />
              ) : null}
            </span>
            <span className="text-primaryText text-md font-light">
              Protected
            </span>
          </button>
        </div>
        {type === "public" ? (
          <PublicChannel setCreateChannel={setCreateChannel} />
        ) : type === "private" ? (
          <PrivateChannel setCreateChannel={setCreateChannel} />
        ) : type === "protected" ? (
          <ProtectedChannel setCreateChannel={setCreateChannel} />
        ) : null}
      </div>
    </div>
  );
}
