import React from "react";

import { useNavigate } from "react-router-dom";

import InputForm from "./inputs/InputForm";
import { checkChannelName } from "../utilities/helpers";
import { ExclamationIcon } from "./Icons";
import { Status } from "../pages/Chat/types";

function PublicChannel({ handleDismiss }: { handleDismiss: () => void }) {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!value.trim().length) {
      setErrorMessage("Zone text empty");
      return;
    }

    try {
      setStatus("loading");

      const res = await fetch("http://localhost:5000/chat/channels", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Set the content type for JSON
        },
        body: JSON.stringify({
          name: value,
          type: "PUBLIC",
        }),
      });

      const body = await res.json();

      if (res.ok) {
        setStatus("success");
        navigate(`/chat/${body.id}`);
        handleDismiss();
      } else {
        setStatus("error");
        setErrorMessage("Name already exists");
        if (res.status === 401) {
          navigate("/login");
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Name already exists");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-end">
        <div className="flex w-full max-w-[320px] flex-col gap-1.5 lg:w-full lg:max-w-full">
          <InputForm
            edit="w-full"
            editError="lg:hidden"
            label="name channel"
            value={value}
            setValue={setValue}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>

        <button className="w-full max-w-[320px] rounded-md bg-primary p-2.5 text-sm text-primaryText lg:w-[128px]">
          Create
        </button>
      </div>

      {errorMessage.length > 0 && (
        <div
          className={`mt-1 hidden gap-1.5 fill-error text-xs font-medium text-error lg:flex`}
        >
          <ExclamationIcon edit="w-3 h-3 relative top-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
}

export default PublicChannel;
