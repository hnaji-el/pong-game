import React from "react";

import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";

import Messages from "./Messages";
import VisuallyHidden from "../../components/VisuallyHidden";
import { SendIcon } from "../../components/Icons";

import { UserType } from "../../api/types";
import { ClientMessage, Message, Status } from "./types";

interface ContextType {
  loggedUserData: UserType;
  isDm: boolean;
  socket: Socket;
}

const DOMAIN = import.meta.env.VITE_BACKEND_ORIGIN;

function Chat() {
  const [value, setValue] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [status, setStatus] = React.useState<Status>("idle");

  const { chatId } = useParams();
  const navigate = useNavigate();

  const { isDm, loggedUserData, socket } = useOutletContext<ContextType>();

  const id = React.useId();
  const inputId = `${id}-message`;

  React.useEffect(() => {
    async function fetcher() {
      try {
        setStatus("loading");

        const res = await fetch(
          `${DOMAIN}/chat/messages/${chatId}?type=${isDm ? "dm" : "channel"}`,
          { credentials: "include" },
        );

        const body = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessages(body);
        } else {
          setStatus("error");
          res.status === 401
            ? navigate("/login")
            : window.alert("Something Went Wrong");
        }
      } catch (err) {
        const error = err as Error;
        setStatus("error");
        window.alert(error.message);
      }
    }

    fetcher();
  }, [chatId, isDm, navigate]);

  React.useEffect(() => {
    if (!socket) return;

    function handleReceiveMessage(msg: Message) {
      if (msg.chatId === chatId) {
        setMessages((currentValue) => [msg, ...currentValue]);
      }
    }

    socket.on("FromServer", handleReceiveMessage);

    return () => {
      socket.off("FromServer", handleReceiveMessage);
    };
  }, [socket, chatId]);

  function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!value.trim() || status !== "success") return;

    socket.emit("FromClient", {
      isDm,
      chatId,
      content: value,
    } as ClientMessage);

    setValue("");
  }

  return (
    <main className="flex grow flex-col overflow-hidden">
      <div className="grow overflow-auto">
        {status === "loading" && (
          <div className="flex h-full items-center justify-center">
            loading...
          </div>
        )}
        {status === "success" && (
          <Messages
            messages={messages}
            loggedUserId={loggedUserData.id}
            isDm={isDm}
          />
        )}
      </div>

      <form
        onSubmit={(event) => handleSendMessage(event)}
        className="flex items-center rounded-md bg-shape pr-2"
      >
        <label htmlFor={inputId}>
          <VisuallyHidden>Message</VisuallyHidden>
        </label>
        <input
          type="text"
          id={inputId}
          placeholder="Type a message"
          value={value}
          onChange={(event) => setValue(event.target.value)}
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

export default Chat;
