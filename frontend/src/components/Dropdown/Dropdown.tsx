import React from "react";

interface DropdownPropsType {
  isOpen: boolean;
  toggleIsOpen: () => void;
  options: { label: string; icon?: React.ReactNode }[];
  handleSelect: (option: string) => void;
  className: string;
  children: React.ReactNode;
}

function Dropdown({
  isOpen,
  toggleIsOpen,
  options,
  handleSelect,
  className,
  children,
}: DropdownPropsType) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        isOpen &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        toggleIsOpen();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, toggleIsOpen]);

  return (
    <div
      className="relative inline-block text-sm text-primaryText"
      ref={wrapperRef}
    >
      {children}

      {isOpen && (
        <ul
          className={`absolute z-[999] flex cursor-default flex-col rounded-md bg-body py-[10px] shadow-[0_4px_10px_rgba(255,255,255,0.2)] ${className}`}
        >
          {options.map((option) => (
            <li
              key={option.label}
              className="flex items-center gap-[8px] px-[16px] py-[10px] hover:bg-backgroundHover"
              onClick={() => {
                handleSelect(option.label);
                toggleIsOpen();
              }}
            >
              {option.icon && option.icon}
              <span className="capitalize">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
