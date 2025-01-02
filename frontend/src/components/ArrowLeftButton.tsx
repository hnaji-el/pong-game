import React from "react";

import { ArrowLeftIcon } from "./Icons";

function ArrowLeftButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="flex h-6 w-6 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover lg:hidden"
      onClick={onClick}
    >
      <ArrowLeftIcon edit="w-2.5 h-2.5 fill-secondaryText" />
    </button>
  );
}

export default ArrowLeftButton;
