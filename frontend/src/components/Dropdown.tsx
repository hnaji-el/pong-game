import React from "react";

import { RiArrowUpSLine as ArrowUpIcon } from "react-icons/ri";
import { RiArrowDownSLine as ArrowDownIcon } from "react-icons/ri";
import { LuUserCheck } from "react-icons/lu";
import VisuallyHidden from "./VisuallyHidden";

interface DropdownPropsType {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export function Dropdown({ isOpen, handleClose, children }: DropdownPropsType) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        isOpen &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, handleClose]);

  return (
    <div className="relative text-sm text-primaryText" ref={wrapperRef}>
      {children}
    </div>
  );
}

export function DropdownBtn({
  isOpen,
  toggleIsOpen,
  type,
  title,
  imgTitle,
}: {
  isOpen: boolean;
  toggleIsOpen: () => void;
  type: string;
  title?: string;
  imgTitle?: string;
}) {
  return type === "text" ? (
    <button className="flex items-center gap-[8px]" onClick={toggleIsOpen}>
      <img
        alt="avatar"
        src={imgTitle}
        className="h-[40px] w-[40px] rounded-full"
      />
      <span className="inline-block max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </span>
      <span
        className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-shape text-secondaryText"
        onClick={(e) => {
          e.stopPropagation();
          e.currentTarget.closest("button")?.click(); // Manually trigger button click
        }}
      >
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </span>

      <VisuallyHidden>
        {isOpen ? "Close dropdown menu" : "Open dropdown menu"}
      </VisuallyHidden>
    </button>
  ) : (
    <button
      className="flex items-center gap-[12px] rounded-md bg-shape px-[12px] py-[8px] text-sm text-primaryText"
      onClick={toggleIsOpen}
    >
      <LuUserCheck size={20} />
      <span>{title}</span>
      <span
        className="rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          e.currentTarget.closest("button")?.click(); // Manually trigger button click
        }}
      >
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </span>

      <VisuallyHidden>
        {isOpen ? "Close dropdown menu" : "Open dropdown menu"}
      </VisuallyHidden>
    </button>
  );
}

export function DropdownList({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`list-dropdown absolute right-0 z-[999] flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 shadow ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  handleClose,
  className,
  onClick,
  children,
}: {
  handleClose: () => void;
  className: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`flex items-center gap-2 hover:bg-backgroundHover ${className}`}
      onClick={(e) => {
        onClick();
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }}
    >
      {children}
    </button>
  );
}
