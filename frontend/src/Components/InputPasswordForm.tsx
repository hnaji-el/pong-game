import React, { useState } from "react";
import {
  ExclamationIcon,
  EyeOffPasswordIcon,
  EyeOnPasswordIcon,
} from "./Icons";

interface TypeProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  errorPassword: string;
  setErrorPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputPasswordForm({
  password,
  setPassword,
  label,
  errorPassword,
  setErrorPassword,
}: TypeProps) {
  const [passwordBtn, setPasswordBtn] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-80 lg:w-full gap-1">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={label} className="text-sm text-primaryText capitalize">
          {label}
        </label>
        <div className="flex">
          <input
            type={`${passwordBtn ? "text" : "password"}`}
            className={`placeholder-secondary-text flex-1 rounded-md rounded-r-none bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${
              errorPassword.length ? "border-[1px] border-error border-r-0" : ""
            }`}
            placeholder={`Enter ${label}`}
            value={password}
            onChange={(e) => {
              setErrorPassword("");
              setPassword(e.currentTarget.value);
            }}
          />
          <button
            type="button"
            className={`rounded-md rounded-l-none bg-secondaryText p-3 ${
              errorPassword.length ? "border-[1px] border-error border-l-0" : ""
            }`}
            onClick={() => {
              passwordBtn ? setPasswordBtn(false) : setPasswordBtn(true);
            }}
          >
            {passwordBtn ? (
              <EyeOffPasswordIcon edit="w-4 h-4 fill-shape" />
            ) : (
              <EyeOnPasswordIcon edit="w-4 h-4 fill-shape" />
            )}
          </button>
        </div>
        {errorPassword.length ? (
          <div className="text-error text-xs font-medium fill-error flex gap-1.5">
            <ExclamationIcon edit="w-3 h-3 relative top-[.1rem]" />
            <span>{errorPassword}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
