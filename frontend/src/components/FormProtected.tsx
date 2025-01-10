import React from "react";

import InputPasswordForm from "./inputs/InputPasswordForm";
import { getAllChannels, joinRoom } from "../api/API";

import { MessagesContext, StateMssages } from "../pages/Chat/Chat";

function FormProtected({ closeModal }: { closeModal: () => void }) {
  const stateMessages = React.useContext(StateMssages);
  const messageData = React.useContext(MessagesContext);
  const [errorPassword, setErrorPassowrd] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <form className="flex flex-col items-center justify-center gap-16">
      <div className="flex w-80 flex-col gap-5">
        <InputPasswordForm
          password={password}
          setPassword={setPassword}
          label="password"
          errorPassword={errorPassword}
          setErrorPassword={setErrorPassowrd}
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary p-2 text-sm text-primaryText"
          onClick={(e) => {
            e.preventDefault();
            const data = {
              name: messageData.channels[messageData.channelIndex].name,
              type: "PROTECTED",
              password: password,
            };

            if (!password.trim().length) {
              setErrorPassowrd("Zone text empty");
              return;
            }
            joinRoom((res: any) => {
              if (res.status === "invalide") {
                setErrorPassowrd("Password incorrect");
                return;
              } else {
                stateMessages.setClick(true);
                messageData.setChatDataBox(res);
                getAllChannels((response: any) => {
                  messageData.setChannels(response);
                  closeModal();
                  document.body.style.overflow = "auto";
                });
              }
            }, data);
          }}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default FormProtected;
