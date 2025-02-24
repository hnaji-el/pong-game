import React from "react";

interface DropdownPropsType {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

interface DropdownListPropsType {
  className: string;
  children: React.ReactNode;
}

interface DropdownItemPropsType {
  handleClose: () => void;
  onClick: () => void;
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

export function DropdownList({ className, children }: DropdownListPropsType) {
  return (
    <div
      className={`absolute z-[999] flex cursor-default flex-col rounded-md bg-body py-[10px] shadow-[0_4px_10px_rgba(255,255,255,0.2)] ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  handleClose,
  onClick,
  children,
}: DropdownItemPropsType) {
  return (
    <button
      className="flex items-center gap-[8px] px-[16px] py-[10px] hover:bg-backgroundHover"
      onClick={() => {
        onClick();
        handleClose();
      }}
    >
      {children}
    </button>
  );
}
