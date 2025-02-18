import React from "react";

import { X as Close } from "react-feather";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

import VisuallyHidden from "../VisuallyHidden";

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
        <div className="fixed inset-0 grid place-content-center p-[16px]">
          <div
            className="absolute inset-0 bg-black/75"
            onClick={handleDismiss}
          />
          <div
            className="relative rounded-[8px] bg-white p-[32px]"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <button
              className="absolute right-0 top-0 -translate-y-full cursor-pointer border-none bg-transparent p-[16px] text-white"
              onClick={handleDismiss}
            >
              <Close />
              <VisuallyHidden>Dismiss modal</VisuallyHidden>
            </button>
            {children}
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}

export default Modal;
