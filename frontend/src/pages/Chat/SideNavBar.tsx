import React from "react";

import { Link } from "react-router-dom";

import ChannelCardList from "../../components/ChannelCardList";
import DmCardList from "../../components/DmCardList";
import Button from "../../components/Button";
import logo from "../../assets/logo.svg";
import { getAllChannels, getAllDms } from "../../api/API";

import { ChannelType, DmType } from "./types";
import { MessagesContext } from "./Chat";

interface PropsType {
  openPasswordModal: () => void;
  openCreateChannelModal: () => void;
  closeSearchModal: () => void;
  closeMobileSettingsModal: () => void;
}

function SideNavBar({
  openPasswordModal,
  openCreateChannelModal,
  closeSearchModal,
  closeMobileSettingsModal,
}: PropsType) {
  const { isDm, setIsDm, setDms, setChannels } =
    React.useContext(MessagesContext);

  function handleLogoClick() {
    closeSearchModal();
    closeMobileSettingsModal();
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
    <aside className="flex grow flex-col gap-12 overflow-hidden">
      <div className="flex items-center justify-center">
        <Link to="/home" onClick={handleLogoClick}>
          <img src={logo} alt="pong logo" className="w-48 lg:w-44" />
        </Link>
      </div>

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
          <DmCardList />
        ) : (
          <ChannelCardList
            openPasswordModal={openPasswordModal}
            openCreateChannelModal={openCreateChannelModal}
          />
        )}
      </div>
    </aside>
  );
}

export default SideNavBar;
