import React, { useState } from "react";
import { checkChannelName, checkPasswordChannel } from "../helpers";
import InputForm from "./InputForm";
import InputPasswordForm from "./InputPasswordForm";

interface TypeProps {
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProtectedChannel({ setCreateChannel }: TypeProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [channelName, setChannelName] = useState<string>("");
  const [errorPassword, setErrorPassowrd] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <form className="flex flex-col gap-5 lg:gap-5">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">
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
          className="w-80 lg:w-32 rounded-md bg-primary p-2.5 text-sm text-primaryText"
          onClick={(e) => {
            e.preventDefault();
            let errorMessage = checkChannelName(channelName);
            let errorPassword = checkPasswordChannel(password);

            if (errorMessage.length || errorPassword.length) {
              if (errorMessage.length) setErrorMessage(errorMessage);
              if (errorPassword.length) setErrorPassowrd(errorPassword);
              return;
            }
            setCreateChannel(false);
            document.body.style.overflow = "auto";
          }}
        >
          Create
        </button>
      </div>
    </form>
  );
}
