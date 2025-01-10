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
  closeModal: () => void;
}

function PasswordCheckModal({
  setChatDataBox,
  channels,
  setChannels,
  channelIndex,
  setClick,
  closeModal,
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
            closeModal();
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
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-16"
    >
      <div className="flex w-80 flex-col gap-5">
        <InputPasswordForm
          password={password}
          setPassword={setPassword}
          label="password"
          errorPassword={errorPassword}
          setErrorPassword={setErrorPassowrd}
        />

        <button className="w-full rounded-md bg-primary p-2 text-sm text-primaryText">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default PasswordCheckModal;
