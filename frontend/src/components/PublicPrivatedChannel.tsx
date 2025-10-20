import React from "react";

import { ChannelType, Status } from "../pages/Chat/types";
import { ExclamationIcon } from "./Icons";

interface PropsType {
  createChannel: (
    setStatus: React.Dispatch<React.SetStateAction<Status>>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    type: ChannelType,
    password?: string,
  ) => Promise<void>;
  type: ChannelType;
}

function PublicPrivateChannel({ createChannel, type }: PropsType) {
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const id = React.useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setErrorMsg("Name should not be empty.");
      return;
    }

    createChannel(setStatus, setErrorMsg, name.trim(), type);
  }

  return (
    <div className="flex flex-col gap-1">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 lg:flex-row lg:items-end"
      >
        <div className="flex w-full max-w-[320px] flex-col gap-1.5 lg:w-full lg:max-w-full">
          <label
            htmlFor={`input-${id}`}
            className="text-sm capitalize text-primaryText"
          >
            channel name
          </label>
          <input
            type="text"
            id={`input-${id}`}
            required={true}
            disabled={status === "loading"}
            maxLength={20}
            value={name}
            onChange={(e) => {
              setErrorMsg("");
              setName(e.target.value);
            }}
            placeholder="Enter channel name"
            className={`rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${status === "loading" ? "opacity-50" : ""}`}
          />
        </div>

        <button
          disabled={status === "loading"}
          className={`w-full max-w-[320px] rounded-md bg-primary p-2.5 text-sm text-primaryText lg:w-[128px] ${status === "loading" ? "opacity-50" : ""}`}
        >
          {status === "loading" ? "Creating..." : "Create"}
        </button>
      </form>

      {errorMsg.length > 0 && (
        <div className="mt-1 hidden gap-1.5 fill-error text-xs font-medium text-error lg:flex">
          <ExclamationIcon edit="w-3 h-3 relative top-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}

export default PublicPrivateChannel;
