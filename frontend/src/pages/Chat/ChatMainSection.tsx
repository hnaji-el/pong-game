import React from "react";

import Messages from "./Messages";
import { SendIcon } from "../../components/Icons";
import { getAllChannels, getAllDms } from "../../api/API";

import { MessagesContext } from "./Chat";
import { ChannelType, DmType } from "./types";
import { Socket } from "socket.io-client";

function ChatMainSection({ socket }: { socket: Socket }) {
  const { isDm, setDms, setChannels, chatDataBox } =
    React.useContext(MessagesContext);

  const [message, setMessage] = React.useState("");

  function handleMessageSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message) return;

    if (isDm) {
      socket.emit("msgFromClient", {
        isDm: true,
        receiverUserId: chatDataBox.id,
        message: message,
      });

      getAllDms((res: DmType[]) => {
        setDms(res);
      });
    } else {
      socket.emit("msgFromClient", {
        isDm: false,
        channelId: chatDataBox.id,
        message: message,
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
        <Messages messages={chatDataBox.messages} />
      </div>
      <form
        onSubmit={(event) => handleMessageSubmit(event)}
        className="flex items-center rounded-md bg-shape pr-2"
      >
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="placeholder-secondary-text flex-1 bg-transparent p-4 pl-3 pr-2 text-sm font-light text-primaryText placeholder:text-sm placeholder:font-light focus:outline-none"
        />
        <button className="flex h-[32px] w-[32px] items-center justify-center rounded-md bg-primary">
          <SendIcon edit="w-[16px] fill-white" />
        </button>
      </form>
    </main>
  );
}

export default ChatMainSection;
