import React from "react";

import { MessagesIcon } from "./Icons";

export function BtnMessage() {
  return (
    <button className="w-36 p-2 rounded-md bg-shape gap-2 flex items-center justify-center">
      <MessagesIcon edit="w-5 fill-primaryText" />
      <span className="text-primaryText text-sm">Message</span>
    </button>
  );
}
