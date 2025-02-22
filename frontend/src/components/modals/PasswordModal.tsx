import React from "react";

import InputPasswordForm from "../inputs/InputPasswordForm";
import { getAllChannels, joinChannel } from "../../api/API";

import { ChannelType } from "../../pages/Chat/types";

interface PropsType {
  setChatDataBox: React.Dispatch<React.SetStateAction<ChannelType>>;
  channels: ChannelType[];
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>;
  channelIndex: number;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  handleDismiss: () => void;
}

function PasswordModal({
  setChatDataBox,
  channels,
  setChannels,
  channelIndex,
  setClick,
  handleDismiss,
}: PropsType) {
  const [errorPassword, setErrorPassowrd] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim().length) {
      setErrorPassowrd("Zone text empty");
      return;
    }

    joinChannel(
      (chnlData: ChannelType) => {
        if (!chnlData.isPasswordValid) {
          setErrorPassowrd("Password incorrect");
          return;
        } else {
          setClick(true);
          setChatDataBox(chnlData);
          console.log(chnlData);
          getAllChannels((chnlsData: ChannelType[]) => {
            setChannels(chnlsData);
            handleDismiss();
            document.body.style.overflow = "auto";
          });
        }
      },
      {
        id: channels[channelIndex].id,
        type: "PROTECTED",
        password: password,
      },
    );
  }

  return (
    <form
      className="flex w-full flex-col items-center gap-[20px] pb-[4px] pt-[20px] lg:w-[640px]"
      onSubmit={handleSubmit}
    >
      <InputPasswordForm
        password={password}
        setPassword={setPassword}
        label="password"
        errorPassword={errorPassword}
        setErrorPassword={setErrorPassowrd}
      />

      <button className="w-full max-w-[320px] rounded-md bg-primary p-2 text-sm text-primaryText lg:w-[320px]">
        Confirm
      </button>
    </form>
  );
}

export default PasswordModal;
