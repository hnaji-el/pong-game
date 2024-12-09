import React, { useState } from "react";
import { CheckIcon } from "../Icons";
import PrivateChannel from "../PrivateChannel";
import ProtectedChannel from "../ProtectedChannel";
import PublicChannel from "../PublicChannel";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateChannel({ setCreateChannel }: TypeProps) {
  const [type, setType] = useState("PUBLIC");
  return (
    <div className="flex w-full items-center">
      <div className="flex w-full flex-col gap-11">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-0">
          <button
            className="flex w-80 items-center gap-3 rounded-md bg-body p-2.5 lg:w-40"
            onClick={() => {
              setType("PUBLIC");
            }}
          >
            <span
              aria-label="Check"
              className={`${
                type === "PUBLIC" ? "bg-primary" : "border-2 border-primary"
              } flex h-7 w-7 items-center justify-center rounded-full`}
            >
              {type === "PUBLIC" ? (
                <CheckIcon edit="w-4 h-4 fill-primaryText" />
              ) : null}
            </span>
            <span className="text-md font-light text-primaryText">Public</span>
          </button>
          <button
            className="flex w-80 items-center gap-3 rounded-md bg-body p-2.5 lg:w-40"
            onClick={() => {
              setType("PRIVATE");
            }}
          >
            <span
              aria-label="Check"
              className={`${
                type === "PRIVATE" ? "bg-primary" : "border-2 border-primary"
              } flex h-7 w-7 items-center justify-center rounded-full`}
            >
              {type === "PRIVATE" ? (
                <CheckIcon edit="w-4 h-4 fill-primaryText" />
              ) : null}
            </span>
            <span className="text-md font-light text-primaryText">Private</span>
          </button>
          <button
            className="flex w-80 items-center gap-3 rounded-md bg-body p-2.5 lg:w-40"
            onClick={() => {
              setType("PROTECTED");
            }}
          >
            <span
              aria-label="Check"
              className={`${
                type === "PROTECTED" ? "bg-primary" : "border-2 border-primary"
              } flex h-7 w-7 items-center justify-center rounded-full`}
            >
              {type === "PROTECTED" ? (
                <CheckIcon edit="w-4 h-4 fill-primaryText" />
              ) : null}
            </span>
            <span className="text-md font-light text-primaryText">
              Protected
            </span>
          </button>
        </div>
        {type === "PUBLIC" ? (
          <PublicChannel setCreateChannel={setCreateChannel} />
        ) : type === "PRIVATE" ? (
          <PrivateChannel setCreateChannel={setCreateChannel} />
        ) : type === "PROTECTED" ? (
          <ProtectedChannel setCreateChannel={setCreateChannel} />
        ) : null}
      </div>
    </div>
  );
}
