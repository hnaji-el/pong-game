import React, { useContext, useState } from "react";
import { getAllChannels } from "../api/API";
import { checkChannelName, checkPasswordChannel } from "../utilities/helpers";
import InputForm from "./InputForm";
import InputPasswordForm from "./InputPasswordForm";
import { MessagesContext } from "../pages/Messages/Messages";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProtectedChannel({ setCreateChannel }: TypeProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [channelName, setChannelName] = useState<string>("");
  const [errorPassword, setErrorPassowrd] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const messageData = useContext(MessagesContext);

  return (
    <form className="flex flex-col gap-5 lg:gap-5">
      <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
        <InputForm
          edit="w-80 lg:w-full"
          value={channelName}
          setValue={setChannelName}
          label="name channel"
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        <InputPasswordForm
          password={password}
          setPassword={setPassword}
          label="password"
          errorPassword={errorPassword}
          setErrorPassword={setErrorPassowrd}
        />
      </div>
      <div className="flex justify-center lg:justify-end">
        <button
          type="submit"
          className="w-80 rounded-md bg-primary p-2.5 text-sm text-primaryText lg:w-32"
          onClick={(e) => {
            e.preventDefault();
            let data = {
              name: channelName,
              type: "PROTECTED",
              password: password,
            };

            let error = false;

            if (!channelName.trim().length) {
              setErrorMessage("Zone text empty");
              error = true;
            }

            if (!password.trim().length) {
              error = true;
              setErrorPassowrd("Zone text empty");
            }

            if (error) return;

            checkChannelName((res: any) => {
              if (res === "error") {
                setErrorMessage("Name already exists");
              } else {
                getAllChannels((res: any) => {
                  messageData.setChannels(res);
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
    </form>
  );
}
