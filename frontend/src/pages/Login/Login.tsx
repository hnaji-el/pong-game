import React from "react";

import { Link, useNavigate } from "react-router-dom";

import gmailLogo from "../../assets/gmailLogo.svg";
import logo from "../../assets/logo.svg";
import Spinner from "../../components/Spinner";
import {
  ArrowLeft,
  ArrowRight,
  PointsBottom,
  PointsTop,
  Pong,
} from "../../components/PongElements";

import { useVerifyUserAuthenticity } from "../../api/API";

const BACKEND_ORIGIN =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_ORIGIN
    : `${import.meta.env.VITE_BACKEND_ORIGIN}${import.meta.env.VITE_PROXY_PREFIX_FOR_BACKEND}`;

function Login() {
  const status = useVerifyUserAuthenticity(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Pong - Login";
  }, []);

  if (status === "pending") {
    return (
      <div className="mx-3 flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    navigate("/home");
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex justify-start px-3 pb-10 pt-5 sm:pt-10 md:px-10">
        <Link to="/login">
          <img src={logo} alt="pong logo" className="w-36 sm:w-48" />
        </Link>
      </header>
      <main className="relative mx-3 mb-3 h-full md:mx-10 md:mb-10">
        <PointsTop edit="absolute top-0 left-0 w-7 lg:w-[1.8rem]" />
        <ArrowRight edit="absolute bottom-0 left-0 w-9 lg:w-[2.5rem]" />
        <PointsBottom edit="absolute bottom-0 right-0 w-16 w-[4.1rem]" />
        <ArrowLeft edit="absolute top-0 right-0 w-9 lg:w-[2.5rem]" />

        <div className="flex h-full w-full items-center justify-center gap-60 lg:relative lg:bottom-5">
          <div className="flex w-full flex-col items-center gap-9 sm:items-start">
            <span className="font-test text-center text-[32px] font-extrabold text-primaryText sm:text-start sm:text-[40px]">
              Real-Time Multiplayer Ping-Pong: Challenge Friends, Smash Records!
            </span>
            <p className="text-center text-lg font-light text-primaryText sm:text-start">
              A platform to play ping-pong, chat, and have fun with friends.
            </p>
            <a href={BACKEND_ORIGIN + "/oauth2/google"}>
              <button className="flex items-center justify-center gap-[10px] rounded-[6px] bg-primary p-[5px] pr-[10px] text-sm text-primaryText">
                <img
                  src={gmailLogo}
                  alt="gmail logo"
                  className="h-[42px] w-[42px] rounded-[6px] bg-white p-[8px]"
                />
                <span>Sign in with Google</span>
              </button>
            </a>
          </div>
          <Pong edit="hidden lg:block" />
        </div>
      </main>
    </div>
  );
}

export default Login;
