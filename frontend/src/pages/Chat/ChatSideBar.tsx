import React from "react";

import { Link, useNavigate } from "react-router-dom";

import Channels from "../../components/Channels";
import DmCardList from "../../components/DmCardList";
import Button from "../../components/buttons/Button/Button";
import VisuallyHidden from "../../components/VisuallyHidden";
import logo from "../../assets/logo.svg";

import { UserType } from "../../api/types";
import { Rooms, Status } from "./types";

const DOMAIN = import.meta.env.VITE_BACKEND_ORIGIN;

interface PropsType {
  loggedUserData: UserType;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChatSideBar({ loggedUserData, setClick }: PropsType) {
  const [isDm, setIsDm] = React.useState(true);
  const [rooms, setRooms] = React.useState<Rooms>({
    dms: [],
    joinedChannels: [],
    notJoinedChannels: [],
  });
  const [status, setStatus] = React.useState<Status>("idle");

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetcher = async () => {
      try {
        setStatus("loading");

        const res = await fetch(
          `${DOMAIN}/chat/rooms?type=${isDm ? "dm" : "channel"}`,
          { credentials: "include" },
        );

        const body: Rooms = await res.json();

        if (res.ok) {
          let initialChatId = "";
          if (isDm && body.dms.length) {
            initialChatId = body.dms[0].id;
          }
          if (!isDm && body.joinedChannels.length) {
            initialChatId = body.joinedChannels[0].id;
          }

          setStatus("success");
          setRooms(body);

          if (initialChatId) {
            navigate(`/chat/${initialChatId}?type=${isDm ? "dm" : "channel"}`, {
              replace: true,
            });
          } else {
            navigate("/chat")
          }
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
    };

    fetcher();
  }, [isDm]);

  function handleDmsButtonClick() {
    setIsDm(true);
  }

  function handleChannelsButtonClick() {
    setIsDm(false);
  }

  return (
    <aside className="flex grow flex-col gap-12 overflow-hidden">
      <Link to="/home" className="flex items-center justify-center">
        <img src={logo} alt="pong logo" className="w-48 lg:w-44" />
        <VisuallyHidden>Go to the home page</VisuallyHidden>
      </Link>

      <div className="flex grow flex-col gap-6 overflow-hidden">
        <div className="mx-3 flex items-center text-sm lg:mx-2">
          <Button isHovered={isDm} onClick={handleDmsButtonClick}>
            Direct Messages
          </Button>
          <Button isHovered={!isDm} onClick={handleChannelsButtonClick}>
            Channels
          </Button>
        </div>

        {isDm ? (
          <DmCardList
            dms={rooms.dms}
            status={status}
            loggedUserData={loggedUserData}
            setClick={setClick}
          />
        ) : (
          <Channels
            joinedChannels={rooms.joinedChannels}
            notJoinedChannels={rooms.notJoinedChannels}
            status={status}
            setClick={setClick}
          />
        )}
      </div>
    </aside>
  );
}

export default ChatSideBar;
