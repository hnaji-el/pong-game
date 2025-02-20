import React from "react";

import {
  ExclamationIcon,
  EyeOffPasswordIcon,
  EyeOnPasswordIcon,
} from "../Icons";
import VisuallyHidden from "../VisuallyHidden";

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
  const [passwordBtn, setPasswordBtn] = React.useState(false);
  const inputId = React.useId();

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-1 lg:w-full lg:max-w-full">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm capitalize text-primaryText"
        >
          {label}
        </label>
        <div className="flex">
          <input
            type={`${passwordBtn ? "text" : "password"}`}
            id={inputId}
            placeholder={`Enter ${label}`}
            value={password}
            onChange={(e) => {
              setErrorPassword("");
              setPassword(e.currentTarget.value);
            }}
            className={`placeholder-secondary-text flex-1 rounded-md rounded-r-none bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${
              errorPassword.length ? "border-[1px] border-r-0 border-error" : ""
            }`}
          />

          <button
            type="button"
            className={`rounded-md rounded-l-none bg-secondaryText p-3 ${
              errorPassword.length ? "border-[1px] border-l-0 border-error" : ""
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
            <VisuallyHidden>
              {passwordBtn ? "Hide password" : "Show password"}
            </VisuallyHidden>
          </button>
        </div>

        {errorPassword.length > 0 && (
          <div className="flex gap-1.5 fill-error text-xs font-medium text-error">
            <ExclamationIcon edit="w-3 h-3 relative top-[.1rem]" />
            <span>{errorPassword}</span>
          </div>
        )}
      </div>
    </div>
  );
}
