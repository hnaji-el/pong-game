import React from "react";

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
