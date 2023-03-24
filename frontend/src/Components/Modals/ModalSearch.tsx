import React, { useEffect, useState, useRef } from "react";
interface TypeProps {
  children: JSX.Element | JSX.Element[] | string;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalSearch({ children, setOpenSearch }: TypeProps) {
  const modalSearch = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  function checkEquale(e: HTMLElement, type: string): boolean {
    let htmlElement = modalSearch.current?.querySelectorAll(type);
    let find = false;

    htmlElement?.forEach((element) => {
      if (element === e) {
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
    let allInput = document.querySelectorAll("input");

    allButton.forEach((e: HTMLButtonElement) => {
      if (checkEquale(e, "button")) {
        e.addEventListener("click", () => {
          setOpenSearch(false);
          document.body.style.overflow = "auto";
        });
      }
    });

    allInput.forEach((e: HTMLInputElement) => {
      if (checkEquale(e, "input")) {
        e.addEventListener("click", () => {
          setOpenSearch(false);
          document.body.style.overflow = "auto";
        });
      }
    });
  }, [setOpenSearch]);

  if (windowWidth >= 1024) document.body.style.overflow = "auto";
  else document.body.style.overflow = "hidden";

  return (
    <div
      className="fixed left-0 top-0 flex justify-center px-3 pt-7 lg:items-start bg-black/30 w-full h-screen backdrop-blur-sm lg:hidden"
      ref={modalSearch}
    >
      {children}
    </div>
  );
}
