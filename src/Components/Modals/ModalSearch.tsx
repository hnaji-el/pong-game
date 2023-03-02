import React, { useEffect, useRef } from "react";
interface TypeProps {
  children: JSX.Element | JSX.Element[] | string;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalSearch({ children,setOpenSearch }: TypeProps) {
  const modalSearch = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    let buttonsModal = modalSearch.current?.querySelectorAll("button");
    let allButton = document.querySelectorAll("button");

    allButton.forEach((e) => {
      e.addEventListener("click", () => {
        setOpenSearch(false);
      });
    });
  }, []);
  return (
    <div
      className="fixed left-0 top-0 flex justify-center px-3 pt-7 lg:items-start bg-black/30 w-full h-screen backdrop-blur-sm lg:hidden modal-search"
      ref={modalSearch}
    >
      {children}
    </div>
  );
}
