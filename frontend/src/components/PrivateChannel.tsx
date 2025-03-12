import React from "react";

import { checkChannelName } from "../utilities/helpers";
import { ExclamationIcon } from "./Icons";
import InputForm from "./inputs/InputForm";
import { getAllChannels } from "../api/API";

import { ChannelType } from "../pages/Chat/types";

interface PropsType {
  handleDismiss: () => void;
}

function PrivateChannel({ handleDismiss }: PropsType) {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!value.trim().length) {
      setErrorMessage("Zone text empty");
      return;
    }

    checkChannelName(
      (res: any) => {
        if (res === "error") {
          setErrorMessage("Name already exists");
        } else {
          getAllChannels((channelsData: ChannelType[]) => {
            handleDismiss();
            document.body.style.overflow = "auto";
          });
        }
      },
      {
        name: value,
        type: "PRIVATE",
        password: "",
      },
    );
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

export default PrivateChannel;
