import React, { useEffect, useState, useRef } from "react";
interface TypeProps {
  children: JSX.Element | JSX.Element[] | string;
  setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalSettings({ children, setOpenSettings }: TypeProps) {
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
          setOpenSettings(false);
          document.body.style.overflow = "auto";
        });
      }
    });
  }, [setOpenSettings]);

  if (windowWidth >= 1024) document.body.style.overflow = "auto";
  else document.body.style.overflow = "hidden";

  return (
    <div
      className="fixed left-0 top-0 flex flex-col px-3 pt-7  bg-body w-full h-screen items-start lg:hidden"
      ref={modalSettings}
    >
      {children}
    </div>
  );
}
