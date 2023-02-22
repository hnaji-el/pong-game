import React,{useContext} from "react"
import { HomeIcon, MessagesIcon, UserIcon, SearchIcon,ControllerIcon } from "../Icons"
import { Link } from "react-router-dom"
import userPicture from "../../assets/user.jpg"
import {ActiveHome} from "../Routes/Home"
import {ActiveMessages} from "../Routes/Messages"
import {ActiveProfile} from "../Routes/Profile"


export default function SideBar() {
  const home = useContext(ActiveHome)
  const messages = useContext(ActiveMessages)
  const profile = useContext(ActiveProfile)

  return (
    <>
      <section className="fixed bottom-0 w-full px-3 pb-3 lg:hidden bg-body z-[999]">
        <nav className="bg-shape p-2 px-3 rounded-lg">
          <ul className="flex justify-between items-center">
            <li>
              <Link to="/" className="flex flex-col justify-center items-center gap-1.5">
                <HomeIcon edit={`w-6 h-6 ${home?"fill-primary":"fill-secondaryText"}`}/>
                <span className={`text-xs ${home?"text-primary":"text-secondaryText"}`}>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/Messages" className="flex flex-col justify-center items-center gap-1.5">
              <MessagesIcon edit={`w-6 h-6 ${messages?"fill-primary":"fill-secondaryText"}`}/>
                <span className={`text-xs ${messages?"text-primary":"text-secondaryText"}`}>Messages</span>
              </Link>
            </li>
            <li>
              <Link to="/Profile" className="flex flex-col justify-center items-center gap-1.5">
              <UserIcon edit={`w-6 h-6 ${profile?"fill-primary":"fill-secondaryText"}`}/>
                <span className={`text-xs ${profile?"text-primary":"text-secondaryText"}`}>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/" className="flex flex-col justify-center items-center gap-1.5">
                <SearchIcon edit="w-5 h-6 fill-secondaryText"/>
                <span className="text-secondaryText text-xs">Search</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex flex-col justify-center items-center gap-1.5"
              >
                <img
                  className="w-10 h-10 rounded-3xl"
                  src={userPicture}
                  alt="User profile"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </section>
      <button className="fixed bg-primary bottom-24 right-3 flex justify-center items-center  w-14 h-14 rounded-full lg:hidden phone-nav">
        <ControllerIcon edit="w-8" />
      </button>
    </>
  );
}
