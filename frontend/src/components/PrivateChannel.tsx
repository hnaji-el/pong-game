import React, { useContext, useState } from "react";
import { getAllChannels } from "../api/API";
import { checkChannelName } from "../utilities/helpers";
import { ExclamationIcon } from "./Icons";
import InputForm from "./InputForm";
import { MessagesContext } from "../pages/Messages";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PublicChannel({ setCreateChannel }: TypeProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const messageData = useContext(MessagesContext);

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
                getAllChannels((res: any) => {
                  messageData.setChannelDm(res);
                  setCreateChannel(false);
                  document.body.style.overflow = "auto";
                });
              }
            }, data);
          }}
        >
          Create
        </button>
      </div>
      {errorMessage.length ? (
        <div
          className={`mt-1 hidden gap-1.5 fill-error text-xs font-medium text-error lg:flex`}
        >
          <ExclamationIcon edit="w-3 h-3 relative top-0.5" />
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </form>
  );
}
