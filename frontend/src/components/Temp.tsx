import React from "react";

function Temp({ children, className }: any) {
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className={`flex flex-col rounded-lg bg-shape p-4 ${className}`}>
        <div
          className={`flex w-full items-center justify-between border-b-[1px] border-b-secondaryText pb-[20px] ${className ? className : ""}`}
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
            <VisuallyHidden>Close modal</VisuallyHidden>
          </button>
        </div>

        <div className={`flex h-full ${className}`}>{children}</div>
      </div>
    </div>
  );
}
