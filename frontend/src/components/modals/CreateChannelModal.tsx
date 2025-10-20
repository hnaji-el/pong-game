import React from "react";

import { useNavigate } from "react-router-dom";

import PublicPrivateChannel from "../PublicPrivatedChannel";
import ProtectedChannel from "../ProtectedChannel";

import { CheckIcon } from "../Icons";
import { Channel, ChannelType, Rooms, Status } from "../../pages/Chat/types";

const DOMAIN = import.meta.env.VITE_BACKEND_ORIGIN;

interface ButtonPropsType {
  isClicked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface CreateChannelPropsType {
  rooms: Rooms;
  setRooms: React.Dispatch<React.SetStateAction<Rooms>>;
  handleDismiss: () => void;
}

function CreateChannelModal({
  rooms,
  setRooms,
  handleDismiss,
}: CreateChannelPropsType) {
  const [type, setType] = React.useState<ChannelType>("PUBLIC");

  const navigate = useNavigate();

  async function createChannel(
    setStatus: React.Dispatch<React.SetStateAction<Status>>,
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    type: ChannelType,
    password?: string,
  ) {
    setStatus("loading");

    try {
      const res = await fetch(`${DOMAIN}/chat/channels`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          password,
        }),
      });

      const body = await res.json();

      if (res.ok) {
        setStatus("success");
        setRooms({
          dms: [],
          joinedChannels: [body, ...rooms.joinedChannels],
          notJoinedChannels: rooms.notJoinedChannels,
        });
        navigate(`/chat/${body.id}?type=channel`);
        handleDismiss();
      } else {
        setStatus("error");
        if (res.status === 401) {
          navigate("/login");
        } else if (res.status === 409 || res.status === 500) {
          setErrorMsg(body.message);
        }
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="flex flex-col gap-[46px] pb-[30px] pt-[46px]">
      <div className="flex flex-col items-center gap-[32px] lg:flex-row">
        <Button isClicked={type === "PUBLIC"} onClick={() => setType("PUBLIC")}>
          public
        </Button>
        <Button
          isClicked={type === "PRIVATE"}
          onClick={() => setType("PRIVATE")}
        >
          private
        </Button>
        <Button
          isClicked={type === "PROTECTED"}
          onClick={() => setType("PROTECTED")}
        >
          protected
        </Button>
      </div>

      {(type === "PUBLIC" || type === "PRIVATE") && (
        <PublicPrivateChannel createChannel={createChannel} type={type} />
      )}

      {type === "PROTECTED" && (
        <ProtectedChannel createChannel={createChannel} />
      )}
    </div>
  );
}

function Button({ isClicked, onClick, children }: ButtonPropsType) {
  return (
    <button
      className="flex w-full max-w-[320px] items-center gap-[12px] rounded-md bg-body p-[10px] lg:w-[160px]"
      onClick={onClick}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          isClicked ? "bg-primary" : "border-2 border-primary"
        }`}
      >
        {isClicked && <CheckIcon edit="w-4 h-4 fill-primaryText" />}
      </span>
      <span className="text-md font-light capitalize text-primaryText">
        {children}
      </span>
    </button>
  );
}

export default CreateChannelModal;
