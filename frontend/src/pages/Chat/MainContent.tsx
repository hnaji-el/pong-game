import React from "react";

import { useOutletContext } from "react-router-dom";

import Messages from "./Messages";
import VisuallyHidden from "../../components/VisuallyHidden";
import { SendIcon } from "../../components/Icons";
import { getAllChannels, getAllDms } from "../../api/API";

import { ChannelType, DmType } from "./types";
import { Socket } from "socket.io-client";
import { UserType } from "../../api/types";

interface ContextType {
  chatDataBox: any;
  loggedUserData: UserType;
  isDm: boolean;
  setDms: React.Dispatch<React.SetStateAction<DmType[]>>;
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>;
  socket: Socket;
}

function MainContent() {
  const [message, setMessage] = React.useState("");
  const id = React.useId();
  const { chatDataBox, loggedUserData, isDm, setDms, setChannels, socket } =
    useOutletContext<ContextType>();

  const inputId = `${id}-message`;

  function handleMessageSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message) return;

    if (isDm) {
      socket.emit("msgFromClient", {
        isDm: true,
        receiverUserId: chatDataBox.id,
        data: message,
      });

      getAllDms((res: DmType[]) => {
        setDms(res);
      });
    } else {
      socket.emit("msgFromClient", {
        isDm: false,
        channelId: chatDataBox.id,
        data: message,
      });

      getAllChannels((res: ChannelType[]) => {
        setChannels(res);
      });
    }

    setMessage("");
  }

  return (
    <main className="flex grow flex-col overflow-hidden">
      <div className="grow overflow-auto">
        <Messages
          messages={chatDataBox.messages}
          loggedUserId={loggedUserData.id}
          isDm={isDm}
        />
      </div>

      <form
        onSubmit={(event) => handleMessageSubmit(event)}
        className="flex items-center rounded-md bg-shape pr-2"
      >
        <label htmlFor={inputId}>
          <VisuallyHidden>Message</VisuallyHidden>
        </label>
        <input
          type="text"
          id={inputId}
          placeholder="Type a message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="placeholder-secondary-text flex-1 bg-transparent p-4 pl-3 pr-2 text-sm font-light text-primaryText placeholder:text-sm placeholder:font-light focus:outline-none"
        />

        <button className="flex h-[32px] w-[32px] items-center justify-center rounded-md bg-primary">
          <SendIcon edit="w-[16px] fill-white" />
          <VisuallyHidden>Send the message</VisuallyHidden>
        </button>
      </form>
    </main>
  );
}

export default MainContent;
