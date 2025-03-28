import React from "react";

import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  PointsBottom,
  PointsTop,
} from "../../components/PongElements";
import logo from "../../assets/logo.svg";
import FormTfa from "../../components/FormTfa";

function Tfa() {
  React.useEffect(() => {
    document.title = "Pong - Tfa";
  }, []);

  return (
    <div className="flex h-full flex-col gap-10">
      <header className="flex justify-center p-10 lg:justify-start">
        <Link to="/login">
          <img src={logo} alt="Pong logo" className="w-48" />
        </Link>
      </header>
      <main className="relative mx-3 mb-3 h-full lg:mx-10 lg:mb-10">
        <PointsTop edit="absolute top-0 left-0 w-7 lg:w-[1.8rem]" />
        <ArrowRight edit="absolute bottom-0 left-0 w-9 lg:w-[2.5rem]" />
        <PointsBottom edit="absolute bottom-0 right-0 w-16 w-[4.1rem]" />
        <ArrowLeft edit="absolute top-0 right-0 w-9 lg:w-[2.5rem]" />
        <div className="relative bottom-5 flex h-full w-full items-center justify-center gap-60">
          <FormTfa />
        </div>
      </main>
    </div>
  );
}

export default Tfa;
