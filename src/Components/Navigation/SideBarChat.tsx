import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Channels from "../Channels";
import Chats from "../Chats";
import { Tabs, TabsList, Tab, TabsPanels, TabContent } from "../Tabs";
import { StateMssages } from "../Routes/Messages";

interface TypeProps {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateChannel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBarChat({
  setOpenSearch,
  setOpenSettings,
  setCreateChannel
}: TypeProps) {
  const stateMessage = useContext(StateMssages);

  return (
    <>
      <section className={`${stateMessage.click?"hidden":"flex"} lg:fixed h-full 2xl:left-auto lg:z-[999] lg:flex flex-col w-full lg:w-60  lg:px-0 pt-7 pb-[12.95rem] lg:py-7 gap-12 lg:bg-sideBackground lg:top-0 lg:left-0`}>
        <div className=" flex items-center justify-center">
          <Link
            to="/"
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
            <Tab>Chats</Tab>
            <Tab>Channels</Tab>
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
