import React from "react";

import { checkChannelName } from "../utilities/helpers";
import { ExclamationIcon } from "./Icons";
import InputForm from "./inputs/InputForm";
import { getAllChannels } from "../api/API";

import { MessagesContext } from "../pages/Chat/Chat";
import { ChannelType } from "../pages/Chat/types";

function PrivateChannel({ closeModal }: { closeModal: () => void }) {
  const { setChannels } = React.useContext(MessagesContext);
  const [value, setValue] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  return (
    <form className="flex flex-col gap-1">
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-end">
        <div className="flex w-80 flex-col gap-1.5 lg:w-full">
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
        <button
          type="submit"
          className="w-80 rounded-md bg-primary p-2.5 text-sm text-primaryText lg:w-32"
          onClick={(e) => {
            e.preventDefault();
            let data = {
              name: value,
              type: "PRIVATE",
              password: "",
            };

            if (!value.trim().length) {
              setErrorMessage("Zone text empty");
              return;
            }
            checkChannelName((res: any) => {
              if (res === "error") {
                setErrorMessage("Name already exists");
              } else {
                getAllChannels((channelsData: ChannelType[]) => {
                  setChannels(channelsData);
                  closeModal();
                  document.body.style.overflow = "auto";
                });
              }
            }, data);
          }}
        >
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
