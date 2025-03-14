import React from "react";

import { useNavigate } from "react-router-dom";

import InputPasswordForm from "../inputs/InputPasswordForm";
import { joinChannel } from "../../api/API";

interface PropsType {
  nextChatId: string;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  handleDismiss: () => void;
}

function PasswordModal({ nextChatId, setClick, handleDismiss }: PropsType) {
  const [errorPassword, setErrorPassowrd] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim().length) {
      setErrorPassowrd("Zone text empty");
      return;
    }

    joinChannel(
      {
        id: nextChatId,
        type: "PROTECTED",
        password: password,
      },
      (chnlData) => {
        if (!chnlData?.isPasswordValid) {
          setErrorPassowrd("Password incorrect");
          return;
        } else {
          setClick(true);
          navigate(`/chat/${nextChatId}`);
          handleDismiss();
        }
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
