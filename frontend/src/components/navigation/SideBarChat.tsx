import React from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import Button from "../Button";
import Dms from "../Dms";
import Channels from "../Channels";

import { getAllChannels, getAllDms } from "../../api/API";

import { StateMssages } from "../../pages/Messages/Messages";
import { MessagesContext } from "../../pages/Messages/Messages";

interface PropsType {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideBarChat({
  setOpenSearch,
  setOpenSettings,
  setCreateChannel,
}: PropsType) {
  const stateMessage = React.useContext(StateMssages);
  const messageData = React.useContext(MessagesContext);
  const [isDm, setIsDm] = React.useState(true);

  return (
    <section
      className={`h-full w-full flex-col gap-12 pb-[12.95rem] pt-7 lg:fixed lg:left-0 lg:top-0 lg:z-[999] lg:flex lg:w-60 lg:bg-sideBackground lg:px-0 lg:py-7 2xl:left-auto ${
        stateMessage.click ? "hidden" : "flex"
      } `}
    >
      <div className="flex items-center justify-center">
        <Link
          to="/home"
          onClick={() => {
            setOpenSearch(false);
            setOpenSettings(false);
            document.body.style.overflow = "auto";
          }}
        >
          <img src={logo} alt="pong logo" className="w-48 lg:w-44" />
        </Link>
      </div>

      <div className="flex h-full flex-col gap-6 lg:overflow-hidden">
        <div className="mx-3 flex items-center text-sm lg:mx-2">
          <Button
            isClicked={isDm}
            onClick={() => {
              setIsDm(true);
              getAllDms((res: any) => {
                messageData.setDms(res);
              });
            }}
          >
            Direct Messages
          </Button>
          <Button
            isClicked={!isDm}
            onClick={() => {
              setIsDm(false);
              getAllChannels((res: any) => {
                messageData.setChannels(res);
              });
            }}
          >
            Channels
          </Button>
        </div>

        <div className="h-full overflow-hidden">
          {isDm ? <Dms /> : <Channels setCreateChannel={setCreateChannel} />}
        </div>
      </div>
    </section>
  );
}

export default SideBarChat;
