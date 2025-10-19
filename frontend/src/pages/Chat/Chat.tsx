import React from "react";

import {
  useOutletContext,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Socket } from "socket.io-client";

import Messages from "./Messages";
import VisuallyHidden from "../../components/VisuallyHidden";
import { SendIcon } from "../../components/Icons";

import { UserType } from "../../api/types";
import { ClientMessage, Message, RoomType, Status } from "./types";
import Spinner from "../../components/Spinner";

interface ContextType {
  loggedUserData: UserType;
  socket: Socket;
}

const DOMAIN = import.meta.env.VITE_BACKEND_ORIGIN;

function Chat() {
  const [value, setValue] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [status, setStatus] = React.useState<Status>("idle");

  const { loggedUserData, socket } = useOutletContext<ContextType>();

  const { chatId } = useParams();

  const [searchParams] = useSearchParams();
  const roomType: RoomType | null = searchParams.get("type") as RoomType | null;

  const navigate = useNavigate();

  const id = React.useId();
  const inputId = `${id}-message`;

  React.useEffect(() => {
    async function fetcher() {
      try {
        setStatus("loading");

        const res = await fetch(
          `${DOMAIN}/chat/messages/${chatId}?type=${roomType}`,
          { credentials: "include" },
        );

        const body: Message[] = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessages(body);
        } else {
          setStatus("error");
          if (res.status === 401) {
            navigate("/login");
          }
        }
      } catch {
        setStatus("error");
      }
    }

    if (chatId && roomType) {
      fetcher();
    }
  }, [chatId, roomType, navigate]);

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
      roomType,
      chatId,
      content: value,
    } as ClientMessage);

    setValue("");
  }

  if (status === "error") {
    return null;
  }

  return (
    <main className="flex grow flex-col overflow-hidden">
      <div className="grow overflow-auto">
        {status === "loading" && (
          <div className="flex h-full items-center justify-center">
            <Spinner size={40} />
          </div>
        )}
        {status === "success" && (
          <Messages
            messages={messages}
            loggedUserId={loggedUserData.id}
            roomType={roomType}
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
