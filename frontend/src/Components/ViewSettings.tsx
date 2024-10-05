import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/API";
import logo from "../assets/logo.svg";
import { LogoutIcon, SettingsNavIcon } from "./Icons";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewSettings({ setOpen }: TypeProps) {
  const navigate = useNavigate();
  return (
    <>
      <Link to="/Home" className="lg:hidden w-full flex justify-center">
        <img src={logo} alt="Pong logo" className="w-48" />
      </Link>
      <div className="w-full pt-10 flex flex-col gap-8 justify-center items-center text-primaryText text-md">
        <button
          className="flex gap-2 p-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <SettingsNavIcon edit="w-7 h-7 fill-primaryText" />
          <span>Settings</span>
        </button>
        <button
          className="flex gap-2 p-2"
          onClick={async () => {
            await logout();
            navigate("/Login");
          }}
        >
          <LogoutIcon edit="w-7 h-7 fill-primaryText" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
