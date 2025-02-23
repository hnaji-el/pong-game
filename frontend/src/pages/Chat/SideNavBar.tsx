import React from "react";

import { Link } from "react-router-dom";

import ChannelCardList from "../../components/ChannelCardList";
import DmCardList from "../../components/DmCardList";
import Button from "../../components/buttons/Button/Button";
import VisuallyHidden from "../../components/VisuallyHidden";
import logo from "../../assets/logo.svg";
import { getAllChannels, getAllDms } from "../../api/API";

import { ChannelType, DmType } from "./types";
import { UserType } from "../../api/types";

interface PropsType {
  loggedUserData: UserType;
  setChatDataBox: React.Dispatch<React.SetStateAction<any>>;
  isDm: boolean;
  setIsDm: React.Dispatch<React.SetStateAction<boolean>>;
  dmIndex: number;
  setDmIndex: React.Dispatch<React.SetStateAction<number>>;
  channelIndex: number;
  setChannelIndex: React.Dispatch<React.SetStateAction<number>>;
  dms: DmType[];
  setDms: React.Dispatch<React.SetStateAction<DmType[]>>;
  channels: ChannelType[];
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideNavBar({
  loggedUserData,
  setChatDataBox,
  isDm,
  setIsDm,
  dmIndex,
  setDmIndex,
  channelIndex,
  setChannelIndex,
  dms,
  setDms,
  channels,
  setChannels,
  setClick,
}: PropsType) {
  function handleDmsButtonClick() {
    setIsDm(true);
    getAllDms((res: DmType[]) => {
      setDms(res);
    });
  }

  function handleChannelsButtonClick() {
    setIsDm(false);
    getAllChannels((res: ChannelType[]) => {
      setChannels(res);
    });
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
            loggedUserData={loggedUserData}
            setChatDataBox={setChatDataBox}
            dmIndex={dmIndex}
            setDmIndex={setDmIndex}
            dms={dms}
            setDms={setDms}
            setClick={setClick}
          />
        ) : (
          <ChannelCardList
            setChatDataBox={setChatDataBox}
            channels={channels}
            setChannels={setChannels}
            channelIndex={channelIndex}
            setChannelIndex={setChannelIndex}
            setClick={setClick}
          />
        )}
      </div>
    </aside>
  );
}

export default SideNavBar;
