import React from "react";

import { checkChannelName } from "../utilities/helpers";
import InputForm from "./inputs/InputForm";
import InputPasswordForm from "./inputs/InputPasswordForm";
import { getAllChannels } from "../api/API";

import { ChannelType } from "../pages/Chat/types";

interface PropsType {
  handleDismiss: () => void;
}

function ProtectedChannel({ handleDismiss }: PropsType) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [channelName, setChannelName] = React.useState("");
  const [errorPassword, setErrorPassowrd] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
        name: channelName,
        type: "PROTECTED",
        password: password,
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
        <InputForm
          edit="w-full max-w-[320px] lg:w-full lg:max-w-full"
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
        <button className="w-[320px] rounded-md bg-primary p-2.5 text-sm text-primaryText lg:w-[128px]">
          Create
        </button>
      </div>
    </form>
  );
}

export default ProtectedChannel;
