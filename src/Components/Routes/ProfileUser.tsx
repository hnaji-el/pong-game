import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { CardProfileUser } from "../Cards";
import SwitchersProfile from "../SwitchersProfile";
import { BtnMessage } from "../BtnMessage";
import BtnAddFriend from "../BtnAddFriend";

export default function ProfileUser() {
  useEffect(() => {
    document.title = "Pong - Profile";
  }, []);
  return (
    <>
      <Navigation />
      <main className="mx-3 pt-10 lg:ml-64 lg:mr-4 flex flex-col gap-12 h-full pb-0">
        {/* <BlockUser /> */}
        <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
          <CardProfileUser />
          <div className="flex flex-row lg:flex-col 1xl:flex-row items-center gap-3">
            {/* <BtnFriend /> */}
            <BtnAddFriend />
            <BtnMessage />
          </div>
          <div className="flex gap-10">
            <span className="flex flex-col items-center">
              <span className="text-primaryText text-4xl font-extrabold max-w-[8rem] overflow-hidden text-ellipsis">
                10
              </span>
              <span className="text-secondaryText text-sm">Friends</span>
            </span>
            <span className="w-[1px] bg-shape"></span>
            <span className="flex flex-col items-center">
              <span className="text-primaryText text-4xl font-extrabold max-w-[8rem] overflow-hidden text-ellipsis">
                0
              </span>
              <span className="text-secondaryText text-sm ">Wins</span>
            </span>
            <span className="w-[1px] bg-shape"></span>
            <span className="flex flex-col items-center">
              <span className="text-primaryText text-4xl font-extrabold max-w-[8rem] overflow-hidden text-ellipsis">
                0
              </span>
              <span className="text-secondaryText text-sm ">Losses</span>
            </span>
          </div>
        </section>
        <SwitchersProfile />
      </main>
    </>
  );
}
