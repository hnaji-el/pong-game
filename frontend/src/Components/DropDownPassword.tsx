import React, { useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  EyeOffPasswordIcon,
  EyeOnPasswordIcon,
  RefreshIcon,
} from "./Icons";

interface TypeProps {
  setChannelPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropDownPassword({ setChannelPassword }: TypeProps) {
  const [passwordBtn, setPasswordBtn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [copy, setCopy] = useState(false);
  return (
    <div className="absolute top-[3rem] p-5 right-0 lg:left-0 rounded-lg lg:w-[26rem] bg-body shadow flex flex-col gap-8 dropdown-channel">
      <div className="flex items-end gap-3">
        <div className="flex w-80 flex-col gap-1.5 lg:w-full">
          <label htmlFor="Name channel" className="text-sm text-primaryText">
            Password
          </label>
          <div className="flex">
            <input
              type={`${passwordBtn ? "text" : "password"}`}
              value={password}
              className="placeholder-secondary-text flex-1 rounded-md rounded-r-none bg-shape p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            <button
              className="rounded-md rounded-l-none bg-secondaryText p-3"
              onClick={() => {
                passwordBtn ? setPasswordBtn(false) : setPasswordBtn(true);
              }}
            >
              <EyeOffPasswordIcon
                edit={`w-4 h-4 ${
                  passwordBtn
                    ? "fill-shape relative z-[1]"
                    : "fill-secondaryText absolute -z-[1]"
                }`}
              />
              <EyeOnPasswordIcon
                edit={`w-4 h-4 ${
                  !passwordBtn
                    ? "fill-shape relative z-[1]"
                    : "fill-secondaryText absolute -z-[1]"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 bg-shape flex rounded-full justify-center items-center"
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 800);
            }}
          >
            <CheckIcon
              edit={`w-5 h-5 ${
                copy
                  ? "fill-secondaryText relative z-[1]"
                  : "fill-shape absolute -z-[1]"
              }`}
            />
            <CopyIcon
              edit={`w-5 h-5 ${
                !copy
                  ? "fill-secondaryText relative z-[1]"
                  : "fill-shape absolute -z-[1]"
              }`}
            />
          </button>
          <button className="w-10 h-10 bg-shape flex rounded-full justify-center items-center">
            <RefreshIcon edit="w-5 h-5 fill-secondaryText" />
          </button>
        </div>
      </div>
      <div className="flex w-full items-center justify-start gap-3">
        <button
          className="w-24 rounded-md bg-shape p-2 text-xs text-primaryText"
          onClick={() => {
            setChannelPassword(false);
          }}
        >
          Cancel
        </button>
        <button
          className="w-24 rounded-md bg-primary p-2 text-xs text-primaryText"
          onClick={() => {
            setChannelPassword(false);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
