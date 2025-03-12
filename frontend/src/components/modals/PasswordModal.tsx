import React from "react";

import { useParams } from "react-router-dom";

import InputPasswordForm from "../inputs/InputPasswordForm";
import { getAllChannels, joinChannel } from "../../api/API";
import { ChannelType } from "../../pages/Chat/types";

interface PropsType {
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  handleDismiss: () => void;
}

function PasswordModal({ setClick, handleDismiss }: PropsType) {
  const { chatId } = useParams();
  const [errorPassword, setErrorPassowrd] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim().length) {
      setErrorPassowrd("Zone text empty");
      return;
    }

    joinChannel(
      (chnlData?: ChannelType) => {
        if (!chnlData?.isPasswordValid) {
          setErrorPassowrd("Password incorrect");
          return;
        } else {
          setClick(true);
          getAllChannels((chnlsData: ChannelType[]) => {
            handleDismiss();
            document.body.style.overflow = "auto";
          });
        }
      },
      {
        id: chatId as string,
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
