import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { LogoutIcon, SettingsNavIcon } from "./Icons";

export default function ViewSettings() {
  return (
    <>
      <Link to="/" className="lg:hidden w-full flex justify-center">
        <img src={logo} alt="Pong logo" className="w-48" />
      </Link>
      <div className="w-full pt-10 flex flex-col gap-8 justify-center items-center text-primaryText text-md">
        <button className="flex gap-2 p-2">
          <SettingsNavIcon edit="w-7 h-7 fill-primaryText" />
          <span>Settings</span>
        </button>
        <button className="flex gap-2 p-2">
          <LogoutIcon edit="w-7 h-7 fill-primaryText" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
