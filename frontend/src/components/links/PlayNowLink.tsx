import React from "react";

import { Link } from "react-router-dom";

import { ControllerIcon } from "../Icons";

function PlayNowLink() {
  return (
    <Link
      to="/game"
      className="flex w-36 items-center justify-center gap-2.5 rounded-md bg-primary p-3 text-sm text-primaryText"
    >
      <ControllerIcon edit="w-7" />
      <span>Play Now</span>
    </Link>
  );
}

export default PlayNowLink;
