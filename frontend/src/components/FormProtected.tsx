import React, { useContext, useState } from "react";
import { getAllChannels, joinRoom } from "../api/API";
import InputPasswordForm from "./InputPasswordForm";
import { MessagesContext } from "../pages/Messages";
import { StateMssages } from "../pages/Messages";

export default function FormProtected() {
  const [errorPassword, setErrorPassowrd] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const messageData = useContext(MessagesContext);
  const stateMessages = useContext(StateMssages);

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
            let data = {
              name: messageData.channelDm[messageData.indexChannel].name,
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
                messageData.setTypeDm("channel");
                messageData.setIndexDm(-1);
                messageData.setDataChatBox(res);
                getAllChannels((response: any) => {
                  messageData.setChannelDm(response);
                  messageData.setpasswordProtected(false);
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
