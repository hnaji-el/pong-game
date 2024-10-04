import React, { useEffect } from "react";
import { CheckToken } from "../../API";
import Astro from "../Astro";
import { Link } from "react-router-dom";

export default function NotFound() {
  CheckToken();
  useEffect(() => {
    document.title = "Pong - Not Found";
  }, []);
  return (
    <main className="h-full flex justify-center items-center">
      <div className="flex items-center flex-col lg:flex-row lg:gap-20">
        <Astro edit=" w-[25rem] h-[25rem] lg:w-[34rem] lg:h-[34rem]" />
        <div className="flex flex-col items-center lg:items-start">
          <span className="text-primary text-[6rem] font-extrabold">404</span>
          <div className="flex flex-col gap-8 items-center lg:items-start">
            <span className="text-primaryText text-[1.5rem] font-bold">
              UH OH! You're lost.
            </span>
            <p className="text-primaryText text-sm w-[80%] lg:w-[29rem] text-center lg:text-left">
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
            <Link
              to="/"
              className="bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-[12rem] lg:w-[8rem] rounded-md p-3"
            >
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
