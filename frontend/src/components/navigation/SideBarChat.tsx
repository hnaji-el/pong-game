import React from "react";

import { Link } from "react-router-dom";

import ChannelCardList from "../ChannelCardList";
import DmCardList from "../DmCardList";
import Button from "../Button";
import logo from "../../assets/logo.svg";
import { getAllChannels, getAllDms } from "../../api/API";

import { ChannelType, DmType } from "../../pages/Messages/types";
import { StateMssages } from "../../pages/Messages/Messages";
import { MessagesContext } from "../../pages/Messages/Messages";

interface PropsType {
  openPasswordModal: () => void;
  openCreateChannelModal: () => void;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideBarChat({
  openPasswordModal,
  openCreateChannelModal,
  setOpenSearch,
  setOpenSettings,
}: PropsType) {
  const { click } = React.useContext(StateMssages);
  const { isDm, setIsDm, setDms, setChannels } =
    React.useContext(MessagesContext);

  function handleLogoClick() {
    setOpenSearch(false);
    setOpenSettings(false);
    document.body.style.overflow = "auto";
  }

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
    <section
      className={`h-full w-full flex-col gap-12 pb-[12.95rem] pt-7 lg:fixed lg:left-0 lg:top-0 lg:z-[999] lg:flex lg:w-60 lg:bg-sideBackground lg:px-0 lg:py-7 2xl:left-auto ${
        click ? "hidden" : "flex"
      } `}
    >
      <div className="flex items-center justify-center">
        <Link to="/home" onClick={handleLogoClick}>
          <img src={logo} alt="pong logo" className="w-48 lg:w-44" />
        </Link>
      </div>

      <div className="flex h-full flex-col gap-6 lg:overflow-hidden">
        <div className="mx-3 flex items-center text-sm lg:mx-2">
          <Button isHovered={isDm} onClick={handleDmsButtonClick}>
            Direct Messages
          </Button>
          <Button isHovered={!isDm} onClick={handleChannelsButtonClick}>
            Channels
          </Button>
        </div>

        <div className="h-full overflow-hidden">
          {isDm ? (
            <DmCardList />
          ) : (
            <ChannelCardList
              openPasswordModal={openPasswordModal}
              openCreateChannelModal={openCreateChannelModal}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default SideBarChat;
