import React from "react";

interface PropsType {
  isHovered: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ isHovered, onClick, children }: PropsType) {
  return (
    <button
      className={`flex flex-1 items-center justify-center border-b-[1px] pb-2 text-[13px] ${
        isHovered
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
