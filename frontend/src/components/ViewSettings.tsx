import React from "react";

import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import { LogoutIcon, SettingsNavIcon } from "./Icons";
import { logout } from "../api/API";

function ViewSettings({ openModal }: { openModal: () => void }) {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/home" className="flex w-full justify-center lg:hidden">
        <img src={logo} alt="Pong logo" className="w-48" />
      </Link>
      <div className="text-md flex w-full flex-col items-center justify-center gap-8 pt-10 text-primaryText">
        <button className="flex gap-2 p-2" onClick={openModal}>
          <SettingsNavIcon edit="w-7 h-7 fill-primaryText" />
          <span>Settings</span>
        </button>
        <button
          className="flex gap-2 p-2"
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
        >
          <LogoutIcon edit="w-7 h-7 fill-primaryText" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

export default ViewSettings;
