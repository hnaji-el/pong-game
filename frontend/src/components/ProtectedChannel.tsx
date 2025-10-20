import React from "react";

import {
  ExclamationIcon,
  EyeOffPasswordIcon,
  EyeOnPasswordIcon,
} from "./Icons";
import VisuallyHidden from "./VisuallyHidden";
import { ChannelType, Status } from "../pages/Chat/types";
import useToggle from "../hooks/use-toggle";

interface PropsType {
  createChannel: (
    setStatus: React.Dispatch<React.SetStateAction<Status>>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    type: ChannelType,
    password?: string,
  ) => Promise<void>;
}

function ProtectedChannel({ createChannel }: PropsType) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, toggleShowPassword] = useToggle(false);

  const [status, setStatus] = React.useState<Status>("idle");
  const [errorNameMsg, setErrorNameMsg] = React.useState("");
  const [errorPswMsg, setErrorPswMsg] = React.useState("");

  const id = React.useId();
  const nameId = `name-${id}`;
  const passwordId = `password-${id}`;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedPassword) {
      if (!trimmedName) setErrorNameMsg("Name should not be empty.");
      if (!trimmedPassword) setErrorPswMsg("Password should not be empty.");
      return;
    }

    createChannel(
      setStatus,
      setErrorNameMsg,
      trimmedName,
      "PROTECTED",
      trimmedPassword,
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-start">
        <div className="flex w-full max-w-[320px] flex-col gap-1.5 lg:max-w-full">
          <label
            htmlFor={nameId}
            className="text-sm capitalize text-primaryText"
          >
            channel name
          </label>
          <input
            type="text"
            id={nameId}
            placeholder="Enter channel name"
            required={true}
            disabled={status === "loading"}
            maxLength={20}
            value={name}
            onChange={(e) => {
              setErrorNameMsg("");
              setName(e.target.value);
            }}
            className={`rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${status === "loading" ? "opacity-50" : ""}`}
          />
        </div>

        <div className="flex w-full max-w-[320px] flex-col gap-[6px] lg:w-[320px]">
          <label
            htmlFor={passwordId}
            className="text-sm capitalize text-primaryText"
          >
            password
          </label>
          <div className="flex">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id={passwordId}
              placeholder="Enter password"
              required={true}
              disabled={status === "loading"}
              minLength={6}
              maxLength={20}
              value={password}
              onChange={(e) => {
                setErrorPswMsg("");
                setPassword(e.target.value);
              }}
              className={`flex-1 rounded-md rounded-r-none bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${
                status === "loading" ? "opacity-50" : ""
              }`}
            />

            <button
              type="button"
              disabled={status === "loading"}
              className={`rounded-md rounded-l-none bg-secondaryText p-3 ${
                status === "loading" ? "opacity-50" : ""
              }`}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeOnPasswordIcon edit="w-4 h-4 fill-shape" />
              ) : (
                <EyeOffPasswordIcon edit="w-4 h-4 fill-shape" />
              )}
              <VisuallyHidden>
                {showPassword ? "Show password" : "Hide password"}
              </VisuallyHidden>
            </button>
          </div>
        </div>
      </div>

      {errorNameMsg.length > 0 && (
        <div className="mt-1 hidden gap-1.5 fill-error text-xs font-medium text-error lg:flex">
          <ExclamationIcon edit="w-3 h-3 relative top-0.5" />
          <span>{errorNameMsg}</span>
        </div>
      )}

      {errorPswMsg.length > 0 && (
        <div className="mt-1 hidden gap-1.5 fill-error text-xs font-medium text-error lg:flex">
          <ExclamationIcon edit="w-3 h-3 relative top-0.5" />
          <span>{errorPswMsg}</span>
        </div>
      )}

      <div className="flex justify-center lg:justify-end">
        <button
          className={`w-[320px] rounded-md bg-primary p-2.5 text-sm text-primaryText lg:w-[128px] ${status === "loading" ? "opacity-50" : ""}`}
        >
          {status === "loading" ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}

export default ProtectedChannel;
