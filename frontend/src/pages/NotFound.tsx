import React from "react";

import { Link, useNavigate } from "react-router-dom";

import Astro from "../components/Astro";
import Spinner from "../components/Spinner";
import { useVerifyUserAuthenticity } from "../api/API";

function NotFound() {
  const status = useVerifyUserAuthenticity();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Pong - Not Found";
  }, []);

  if (status === "pending") {
    return (
      <div className="mx-3 flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    navigate("/login");
  }

  return (
    <main className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center lg:flex-row lg:gap-20">
        <Astro edit=" w-[25rem] h-[25rem] lg:w-[34rem] lg:h-[34rem]" />
        <div className="flex flex-col items-center lg:items-start">
          <span className="text-[6rem] font-extrabold text-primary">404</span>
          <div className="flex flex-col items-center gap-8 lg:items-start">
            <span className="text-[1.5rem] font-bold text-primaryText">
              UH OH! You&apos;re lost.
            </span>
            <p className="w-[80%] text-center text-sm text-primaryText lg:w-[29rem] lg:text-left">
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
            <Link
              to="/"
              className="flex w-[12rem] items-center justify-center gap-2.5 rounded-md bg-primary p-3 text-sm text-primaryText lg:w-[8rem]"
            >
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
