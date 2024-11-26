import React, { useContext, useState } from "react";
import { CreateChannel, getAllChannels } from "../api/API";
import { checkChannelName } from "../utilities/helpers";
import { ExclamationIcon } from "./Icons";
import InputForm from "./InputForm";
import { MessagesContext } from "./routes/Messages";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PublicChannel({ setCreateChannel }: TypeProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const messageData = useContext(MessagesContext);

  return (
    <form className="flex flex-col gap-1">
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-3 ">
        <div className="flex flex-col gap-1.5 w-80 lg:w-full">
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
          className="w-80 lg:w-32 rounded-md bg-primary p-2.5 text-sm text-primaryText"
          onClick={(e) => {
            e.preventDefault();
            let data = {
              name: value,
              type: "public",
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
          className={`text-error text-xs font-medium fill-error hidden mt-1 lg:flex gap-1.5`}
        >
          <ExclamationIcon edit="w-3 h-3 relative top-0.5" />
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </form>
  );
}
