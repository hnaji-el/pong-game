import React from "react";

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import Channels from "../../components/Channels";
import DmCardList from "../../components/DmCardList";
import Button from "../../components/buttons/Button/Button";
import VisuallyHidden from "../../components/VisuallyHidden";
import logo from "../../assets/logo.svg";

import { UserType } from "../../api/types";
import { Rooms, RoomType, Status } from "./types";

const DOMAIN = import.meta.env.VITE_BACKEND_ORIGIN;

interface PropsType {
  loggedUserData: UserType;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChatSideBar({ loggedUserData, setToggle }: PropsType) {
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const type: RoomType | null = searchParams.get("type") as RoomType | null;

  const [roomType, setRoomType] = React.useState<RoomType>(
    type && (type === "dm" || type === "channel") ? type : "dm",
  );
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

        const res = await fetch(`${DOMAIN}/chat/rooms?type=${roomType}`, {
          credentials: "include",
        });

        const body: Rooms = await res.json();

        if (res.ok) {
          let initialChatId = "";
          if (roomType === "dm" && body.dms.length) {
            initialChatId =
              chatId && body.dms.find((element) => element.id === chatId)
                ? chatId
                : body.dms[0].id;
          }
          if (roomType === "channel" && body.joinedChannels.length) {
            initialChatId =
              chatId && body.joinedChannels.find((element) => element.id === chatId)
                ? chatId
                : body.joinedChannels[0].id;
          }

          setStatus("success");
          setRooms(body);

          if (initialChatId) {
            navigate(`/chat/${initialChatId}?type=${roomType}`, {
              replace: true,
            });
          } else {
            navigate("/chat");
          }
        } else {
          setStatus("error");
          if (res.status === 401) {
            navigate("/login");
          }
        }
      } catch {
        setStatus("error");
      }
    };

    fetcher();
  }, [roomType]);

  function handleDmsButtonClick() {
    setRoomType("dm");
  }

  function handleChannelsButtonClick() {
    setRoomType("channel");
  }

  return (
    <aside className="flex grow flex-col gap-12 overflow-hidden">
      <Link to="/home" className="flex items-center justify-center">
        <img src={logo} alt="pong logo" className="w-48 lg:w-44" />
        <VisuallyHidden>Go to the home page</VisuallyHidden>
      </Link>

      <div className="flex grow flex-col gap-6 overflow-hidden">
        <div className="mx-3 flex items-center text-sm lg:mx-2">
          <Button isHovered={roomType === "dm"} onClick={handleDmsButtonClick}>
            Direct Messages
          </Button>
          <Button
            isHovered={roomType === "channel"}
            onClick={handleChannelsButtonClick}
          >
            Channels
          </Button>
        </div>

        {roomType === "dm" ? (
          <DmCardList
            dms={rooms.dms}
            status={status}
            loggedUserData={loggedUserData}
            setToggle={setToggle}
          />
        ) : (
          <Channels
            joinedChannels={rooms.joinedChannels}
            notJoinedChannels={rooms.notJoinedChannels}
            status={status}
            setToggle={setToggle}
          />
        )}
      </div>
    </aside>
  );
}

export default ChatSideBar;
