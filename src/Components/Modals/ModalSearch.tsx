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

  function checkEquale(e: HTMLButtonElement): boolean {
    let buttonsModal = modalSearch.current?.querySelectorAll("button");
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
      className="fixed left-0 top-0 flex justify-center px-3 pt-7 lg:items-start bg-black/30 w-full h-screen backdrop-blur-sm lg:hidden modal-search"
      ref={modalSearch}
    >
      {children}
    </div>
  );
}
