import React from "react";

import { Link } from "react-router-dom";

import Channels from "../../components/Channels";
import DmCardList from "../../components/DmCardList";
import Button from "../../components/buttons/Button/Button";
import VisuallyHidden from "../../components/VisuallyHidden";
import logo from "../../assets/logo.svg";

import { UserType } from "../../api/types";
import { Rooms, Status } from "./types";

interface PropsType {
  rooms: Rooms;
  roomsStatus: Status;
  isDm: boolean;
  setIsDm: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUserData: UserType;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideNavBar({
  rooms,
  roomsStatus,
  isDm,
  setIsDm,
  loggedUserData,
  setClick,
}: PropsType) {
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
            roomsStatus={roomsStatus}
            loggedUserData={loggedUserData}
            setClick={setClick}
          />
        ) : (
          <Channels
            joinedChannels={rooms.joinedChannels}
            notJoinedChannels={rooms.notJoinedChannels}
            roomsStatus={roomsStatus}
            setClick={setClick}
          />
        )}
      </div>
    </aside>
  );
}

export default SideNavBar;
