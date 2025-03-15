import React from "react";

import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import Messages from "./Messages";
import VisuallyHidden from "../../components/VisuallyHidden";
import { SendIcon } from "../../components/Icons";
import { Socket } from "socket.io-client";
import { UserType } from "../../api/types";
import { Message, Status } from "./types";

interface ContextType {
  loggedUserData: UserType;
  isDm: boolean;
  socket: Socket;
}

function Chat() {
  const [value, setValue] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [status, setStatus] = React.useState<Status>("idle");

  const { chatId } = useParams();
  const navigate = useNavigate();

  const { isDm, loggedUserData, socket } = useOutletContext<ContextType>();

  const id = React.useId();
  const inputId = `${id}-message`;

  // API: GET /chat/messages/:roomId
  // payload: Message[]
  // success: 200 Ok
  // failure: 1/ 401, !401

  React.useEffect(() => {
    async function fetcher() {
      try {
        setStatus("loading");

        const res = await fetch(
          `http://localhost:5000/chat/messages/${chatId}`,
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
  }, [chatId, navigate]);

  React.useEffect(() => {
    if (!socket) return;

    function handleReceiveMessage(msg: Message) {
      if (msg.roomId === chatId) {
        setMessages((currentValue) => [...currentValue, msg]);
      }
    }

    socket.on("FromServer", handleReceiveMessage);

    return () => {
      socket.off("FromServer", handleReceiveMessage);
    };
  }, [socket, chatId, loggedUserData]);

  function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!value.trim() || status !== "success") return;

    socket.emit("FromClient", {
      roomId: chatId,
      data: value,
    });

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
