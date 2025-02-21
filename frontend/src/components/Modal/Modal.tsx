import React from "react";

import { X as Close } from "react-feather";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

import VisuallyHidden from "../VisuallyHidden";
import { CloseIcon } from "../Icons";

interface PropsType {
  title: string;
  handleDismiss: () => void;
  children: React.ReactNode;
}

function Modal({ title, handleDismiss, children }: PropsType) {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Escape") {
        handleDismiss();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleDismiss]);

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-[16px] sm:p-[32px]">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleDismiss}
          />
          <div
            className="relative flex w-full flex-col rounded-[8px] bg-shape p-[16px] lg:w-auto"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <header className="flex items-center justify-between border-b-[1px] border-b-secondaryText pb-[20px] pl-[8px]">
              <h2 className="text-xl font-light text-primaryText">{title}</h2>
              <button
                className="h-[32px] w-[32px] p-[8px]"
                onClick={handleDismiss}
              >
                <CloseIcon edit="fill-secondaryText" />
                <VisuallyHidden>Dismiss modal</VisuallyHidden>
              </button>
            </header>

            <main>{children}</main>
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}

export default Modal;
