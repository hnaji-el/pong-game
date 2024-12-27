import React from "react";

import { checkChannelName } from "../utilities/helpers";
import InputForm from "./InputForm";
import InputPasswordForm from "./InputPasswordForm";
import { getAllChannels } from "../api/API";

import { MessagesContext } from "../pages/Messages/Messages";
import { ChannelType } from "../pages/Messages/types";

function ProtectedChannel({ closeModal }: { closeModal: () => void }) {
  const { setChannels } = React.useContext(MessagesContext);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [channelName, setChannelName] = React.useState("");
  const [errorPassword, setErrorPassowrd] = React.useState("");
  const [password, setPassword] = React.useState("");

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
            const data = {
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
    </form>
  );
}

export default ProtectedChannel;
