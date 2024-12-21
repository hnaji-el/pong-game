import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Channels from "../Channels";
import Chats from "../Chats";
import { Tabs, TabsList, Tab, TabsPanels, TabContent } from "../Tabs";
import { StateMssages } from "../../pages/Messages/Messages";
import { MessagesContext } from "../../pages/Messages/Messages";
import { getAllChannels, getAllDms } from "../../api/API";

interface TypeProps {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBarChat({
  setOpenSearch,
  setOpenSettings,
  setCreateChannel,
}: TypeProps) {
  const stateMessage = useContext(StateMssages);
  const messageData = useContext(MessagesContext);

  return (
    <>
      <section
        className={`${
          stateMessage.click ? "hidden" : "flex"
        } h-full w-full flex-col gap-12 pb-[12.95rem] pt-7 lg:fixed lg:left-0 lg:top-0 lg:z-[999] lg:flex lg:w-60 lg:bg-sideBackground lg:px-0 lg:py-7 2xl:left-auto`}
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
            <img src={logo} alt="Pong logo" className="w-48 lg:w-44" />
          </Link>
        </div>
        <Tabs>
          <TabsList edit="mx-3 lg:mx-2">
            <Tab
              onClick={() => {
                getAllDms((res: any) => {
                  messageData.setDms(res);
                });
              }}
            >
              Direct Messages
            </Tab>
            <Tab
              onClick={() => {
                getAllChannels((res: any) => {
                  messageData.setChannels(res);
                });
              }}
            >
              Channels
            </Tab>
          </TabsList>
          <TabsPanels>
            <TabContent>
              <Chats />
            </TabContent>
            <TabContent>
              <Channels setCreateChannel={setCreateChannel} />
            </TabContent>
          </TabsPanels>
        </Tabs>
      </section>
    </>
  );
}
