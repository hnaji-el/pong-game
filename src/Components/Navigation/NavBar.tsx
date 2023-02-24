import React from "react";
import logo from "../../assets/logo.svg";
import pictureUser from "../../assets/user.jpg";
import { Link } from "react-router-dom";
import { SearchIcon, ControllerIcon, ArrowDownIcon } from "../Icons";
import { firstLetterCapital } from "../../helpers";

export default function NavBar() {
  return (
    <section className="flex justify-center items-center pt-7 lg:justify-between lg:items-start lg:mr-4 lg:ml-64 lg:pt-7 lg:gap-5">
      <Link to="/" className="lg:hidden">
        <img src={logo} alt="Pong logo" className="w-48" />
      </Link>
      <div className="hidden lg:block flex-1 relative">
        <div className="flex items-center bg-shape pr-4 rounded-md">
          <input
            type="text"
            placeholder="Search for user"
            className="flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-4 pr-1.5 focus:outline-none text-primaryText"
          />
          <SearchIcon edit="w-4 fill-secondaryText" />
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-5">
        <button className="bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3">
          <ControllerIcon edit="w-7" />
          <span>Play now</span>
        </button>
        <div className="relative text-primaryText text-sm">
          <button className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src={pictureUser}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <span className="max-w-[9.6rem] overflow-hidden text-ellipsis	whitespace-nowrap">
                {firstLetterCapital("mouassit")}
              </span>
            </div>
            <span className="bg-shape w-4 h-4 rounded-full flex justify-center items-center">
              <ArrowDownIcon edit="w-1.5 fill-secondaryText" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
