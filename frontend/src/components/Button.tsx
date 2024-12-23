import React from "react";

function Button({
  isClicked,
  onClick,
  children,
}: {
  isClicked: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      className={`flex flex-1 items-center justify-center border-b-[1px] pb-2 text-[13px] ${
        isClicked
          ? "border-b-primary text-primaryText"
          : "border-b-shape text-secondaryText"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
