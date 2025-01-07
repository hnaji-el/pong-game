import React from "react";

import { useNavigate } from "react-router-dom";

import { ControllerIcon } from "../Icons";

function PlayNowButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/game")}
      className="flex w-36 items-center justify-center gap-2.5 rounded-md bg-primary p-3 text-sm text-primaryText"
    >
      <ControllerIcon edit="w-7" />
      <span>Play Now</span>
    </button>
  );
}

export default PlayNowButton;
