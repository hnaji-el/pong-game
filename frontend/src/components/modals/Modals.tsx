import React from "react";

import { CloseIcon } from "../Icons";
import VisuallyHidden from "../VisuallyHidden";

interface ModalPropsType {
  children: JSX.Element[];
  className: string;
}

interface ModalHeaderPropsType {
  children: string;
  className?: string;
  closeModal: () => void;
}

interface ModalBodyPropsType {
  children: JSX.Element;
  className: string;
}

export function Modal({ children, className }: ModalPropsType) {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-black/30 backdrop-blur-sm lg:items-start">
      <div
        className={`mt-0 flex flex-col rounded-lg bg-shape p-4 lg:mt-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({
  children,
  className,
  closeModal,
}: ModalHeaderPropsType) {
  return (
    <>
      <div
        className={`flex w-full items-center justify-between border-secondaryText ${className}`}
      >
        <div className="text-xl font-light text-primaryText">{children}</div>
        <button
          className="h-4 w-4 rounded-full"
          onClick={() => {
            closeModal();
            document.body.style.overflow = "auto";
          }}
        >
          <CloseIcon edit="w-full h-full fill-secondaryText" />
          <VisuallyHidden>Close the modal</VisuallyHidden>
        </button>
      </div>
      <div className={`pt-5 ${className}`}>
        <div className="h-[1px] w-full bg-secondaryText"></div>
      </div>
    </>
  );
}

export function ModalBody({ children, className }: ModalBodyPropsType) {
  return <div className={`flex h-full ${className}`}>{children}</div>;
}
