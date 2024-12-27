import React, { useEffect, useState, useRef } from "react";
interface TypeProps {
  children: JSX.Element | JSX.Element[] | string;
  closeModal: () => void;
}

export default function ModalSettings({ children, closeModal }: TypeProps) {
  const modalSettings = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  function checkEquale(e: HTMLButtonElement): boolean {
    let buttonsModal = modalSettings.current?.querySelectorAll("button");
    let find = false;

    buttonsModal?.forEach((button) => {
      if (button === e) {
        find = true;
        return;
      }
    });

    if (find) return false;
    return true;
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", setWindowDimensions);
    let allButton = document.querySelectorAll("button");

    allButton.forEach((e: HTMLButtonElement) => {
      if (checkEquale(e)) {
        e.addEventListener("click", () => {
          closeModal();
          document.body.style.overflow = "auto";
        });
      }
    });
  }, [closeModal]);

  if (windowWidth >= 1024) document.body.style.overflow = "auto";
  else document.body.style.overflow = "hidden";

  return (
    <div
      className="fixed left-0 top-0 flex h-screen w-full flex-col items-start bg-body px-3 pt-7 lg:hidden"
      ref={modalSettings}
    >
      {children}
    </div>
  );
}
