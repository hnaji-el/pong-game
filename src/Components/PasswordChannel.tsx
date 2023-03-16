import React from "react";
import {
  CopyIcon,
  EyeChannelIcon,
  EyeOnPasswordIcon,
  RefreshIcon,
} from "./Icons";

export default function PasswordChannel() {
  return (
    <div className="relative">
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-shape">
        <EyeChannelIcon edit="fill-secondaryText w-5 h-5" />
      </button>
      <div className="absolute p-5 right-0 lg:left-0 rounded-lg lg:w-96 bg-body shadow flex flex-col gap-8 dropdown-channel">
        <div className="flex items-end gap-3">
          <div className="flex w-80 flex-col gap-1.5 lg:w-full">
            <label htmlFor="Name channel" className="text-sm text-primaryText">
              Password
            </label>
            <div className="flex">
              <input
                type="password"
                className="placeholder-secondary-text flex-1 rounded-md rounded-r-none bg-shape p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light"
                placeholder="Enter password"
              />
              <button className="rounded-md rounded-l-none bg-secondaryText p-3">
                <EyeOnPasswordIcon edit="w-4 h-4 fill-shape" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-shape flex rounded-full justify-center items-center">
              <CopyIcon edit="w-5 h-5 fill-secondaryText" />
            </button>
            <button className="w-10 h-10 bg-shape flex rounded-full justify-center items-center">
              <RefreshIcon edit="w-5 h-5 fill-secondaryText" />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-start gap-3">
          <button className="w-24 rounded-md bg-shape p-2 text-xs text-primaryText">
            Cancel
          </button>
          <button className="w-24 rounded-md bg-primary p-2 text-xs text-primaryText">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
