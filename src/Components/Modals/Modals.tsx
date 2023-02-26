import React from "react";
import { CloseIcon } from "../Icons";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  close?: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: string;
}

export function Modal({ children, edit }: Props) {
  return (
    <div
      className="absolute left-0 top-0 flex justify-center items-center lg:items-start bg-black/30 w-full h-full backdrop-blur-sm z-[999]"
    >
      <div
        className={`bg-shape mt-0 lg:mt-8 rounded-lg flex flex-col pt-4 px-4 ${edit}`}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, edit, close }: Props) {
  return (
    <div
      className={`flex items-center w-full justify-between border-secondaryText pb-5 ${edit}`}
      style={{ borderBottom: "1px solid #81879C" }}
    >
      <div className="text-primaryText text-xl font-light">{children}</div>
      <button
        className="w-4 h-4 rounded-full"
        onClick={() => {
          if (close) close(true);
        }}
      >
        <CloseIcon edit="w-full h-full fill-secondaryText" />
      </button>
    </div>
  );
}

export function ModalBody({ children, edit }: Props) {
  return <div className={`flex h-full ${edit}`}>{children}</div>;
}
