import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckTokenLogin } from "../../API";
import logo from "../../assets/logo.svg";
import logo42 from "../../assets/logo42.svg";
import {
  ArrowLeft,
  ArrowRight,
  PointsBottom,
  PointsTop,
  Pong,
} from "../PongElements";
import Redirection from "./Redirection";

const domain = process.env.REACT_APP_DOMAIN;
export default function Login() {
  const [checkLogin, setCheckLogin] = useState<string>("");
  CheckTokenLogin((res: any) => {
    setCheckLogin(res);
  });
  useEffect(() => {
    document.title = "Pong - Login";
  }, []);
  if (checkLogin.length)
    return (
      <div className="flex flex-col gap-10 h-full">
        <header className="p-10 flex justify-center lg:justify-start">
          <Link to="/Login">
            <img src={logo} alt="Pong logo" className="w-48" />
          </Link>
        </header>
        <main className="relative h-full mx-3 mb-3 lg:mb-10 lg:mx-10">
          <PointsTop edit="absolute top-0 left-0 w-7 lg:w-[1.8rem]" />
          <ArrowRight edit="absolute bottom-0 left-0 w-9 lg:w-[2.5rem]" />
          <PointsBottom edit="absolute bottom-0 right-0 w-16 w-[4.1rem]" />
          <ArrowLeft edit="absolute top-0 right-0 w-9 lg:w-[2.5rem]" />

          <div className="flex items-center gap-60 w-full justify-center h-full lg:relative lg:bottom-5">
            <div className="flex flex-col items-center lg:items-start gap-9">
              <span className="text-primaryText font-extrabold text-[2.6rem] font-test">
                Play pong games
              </span>
              <p className="text-primaryText font-light text-lg w-[23.8rem]">
                Platform for playing pong games with your friends and stream
                your matches.
              </p>
              <button
                className="bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-[12rem] lg:w-[10rem] rounded-md p-3"
                onClick={() => {
                  window.location.href = domain+"/auth/login";
                }}
              >
                <span>Sing in with</span>
                <img
                  src={logo42}
                  alt="logo school 42"
                  className="w-6 relative top-[.1rem]"
                />
              </button>
            </div>
            <Pong edit="hidden lg:block" />
          </div>
        </main>
      </div>
    );

  return <Redirection />;
}
