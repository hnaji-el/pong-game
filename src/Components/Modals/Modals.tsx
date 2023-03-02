import React, { useEffect } from "react";
import { CloseIcon } from "../Icons";

interface TypeProps {
  children: JSX.Element | JSX.Element[] | string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: string;
}

export function Modal({ children, edit }: TypeProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className="fixed left-0 top-0 flex justify-center items-center lg:items-start bg-black/30 w-full h-full backdrop-blur-sm z-[999]">
      <div
        className={`bg-shape mt-0 lg:mt-8 rounded-lg flex flex-col pt-4 px-4 ${edit}`}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, edit, setOpen }: TypeProps) {
  return (
    <div
      className={`flex items-center w-full justify-between border-secondaryText pb-5 ${edit}`}
      style={{ borderBottom: "1px solid #81879C" }}
    >
      <div className="text-primaryText text-xl font-light">{children}</div>
      <button
        className="w-4 h-4 rounded-full"
        onClick={() => {
          if (setOpen) {
            setOpen(false);
            document.body.style.overflow = "auto";
          }
        }}
      >
        <CloseIcon edit="w-full h-full fill-secondaryText" />
      </button>
    </div>
  );
}

export function ModalBody({ children, edit }: TypeProps) {
  return <div className={`flex h-full ${edit}`}>{children}</div>;
}
