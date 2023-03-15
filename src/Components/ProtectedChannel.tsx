import React from "react";
import { EyeOnPasswordIcon } from "./Icons";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProtectedChannel({ setCreateChannel }: TypeProps) {
  return (
    <div className="flex flex-col gap-5 lg:gap-5">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">
        <div className="flex flex-col gap-1.5 w-80 lg:w-full">
          <label htmlFor="Name channel" className="text-sm text-primaryText">
            Name Channel
          </label>
          <input
            type="text"
            className={`placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light`}
            placeholder="Enter name channel"
          />
        </div>
        <div className="flex flex-col w-80 lg:w-full gap-1">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="Name channel" className="text-sm text-primaryText">
              Password
            </label>
            <div className="flex">
              <input
                type="password"
                className={`flex-1 placeholder-secondary-text rounded-md rounded-r-none bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light`}
                placeholder="Enter password"
              />
              <button
                className={`bg-secondaryText p-3 rounded-md rounded-l-none`}
              >
                <EyeOnPasswordIcon edit="w-4 h-4 fill-shape" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end">
        <button className="w-80 lg:w-32 rounded-md bg-primary p-2.5 text-sm text-primaryText">
          Create
        </button>
      </div>
    </div>
  );
}
