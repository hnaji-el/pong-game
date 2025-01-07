import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

import { ArrowDownIcon, ArrowUpIcon, FriendIcon } from "./Icons";
import VisuallyHidden from "./VisuallyHidden";

interface PropsDropdown {
  children?: JSX.Element | JSX.Element[] | string;
  edit?: string;
  onClick?: () => void;
}

interface PropsDropdownBtn {
  type: string;
  title?: string;
  imgTitle?: string;
  arrow?: boolean;
  icon?: JSX.Element | undefined;
  edit?: string;
}

interface TypeContext {
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DisplayContext = createContext<TypeContext>({
  dropdown: false,
  setDropdown: () => {},
});

export function Dropdown({ children }: PropsDropdown) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const refDropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        refDropDown.current &&
        dropdown &&
        !refDropDown.current.contains(e.target as HTMLDivElement)
      )
        setDropdown(false);
    });
  }, [dropdown]);

  return (
    <DisplayContext.Provider
      value={{ dropdown: dropdown, setDropdown: setDropdown }}
    >
      <div className="relative text-sm text-primaryText" ref={refDropDown}>
        {children}
      </div>
    </DisplayContext.Provider>
  );
}

export function DropdownBtn({
  type,
  title,
  imgTitle,
  arrow,
  icon,
  edit,
}: PropsDropdownBtn) {
  let changeStateDropdown = useContext(DisplayContext);

  if (type === "text")
    return (
      <button
        className="flex items-center gap-2"
        onClick={() => {
          changeStateDropdown.dropdown
            ? changeStateDropdown.setDropdown(false)
            : changeStateDropdown.setDropdown(true);
        }}
      >
        <div className="flex items-center gap-2">
          {imgTitle && (
            <img
              src={imgTitle}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
          )}
          <span className="max-w-[9.6rem] overflow-hidden text-ellipsis whitespace-nowrap">
            {title ? title : null}
          </span>
        </div>

        {arrow && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-shape">
            {changeStateDropdown.dropdown ? (
              <ArrowDownIcon edit="w-1.5 h-1.5 fill-secondaryText" />
            ) : (
              <ArrowUpIcon edit="w-1.5 h-1.5 fill-secondaryText" />
            )}
          </span>
        )}

        <VisuallyHidden>
          {changeStateDropdown.dropdown
            ? "Close settings dropdown menu"
            : "Open settings dropdown menu"}
        </VisuallyHidden>
      </button>
    );

  if (type === "icon")
    return (
      <button
        className={`flex items-center justify-center rounded-full ${edit}`}
        onClick={() => {
          if (changeStateDropdown.dropdown) {
            changeStateDropdown.setDropdown(false);
            return;
          }
          changeStateDropdown.setDropdown(true);
        }}
      >
        {icon}
      </button>
    );

  if (type === "button")
    return (
      <button
        className="flex w-36 items-center justify-center gap-6 rounded-md bg-shape p-2"
        onClick={() => {
          if (changeStateDropdown.dropdown) {
            changeStateDropdown.setDropdown(false);
            return;
          }
          changeStateDropdown.setDropdown(true);
        }}
      >
        <div className="flex gap-2">
          <FriendIcon edit="w-5 fill-primaryText" />
          <span className="text-sm text-primaryText">{title}</span>
        </div>
        <span className="rounded-full">
          {arrow ? (
            changeStateDropdown.dropdown ? (
              <ArrowUpIcon edit="w-2 h-2 fill-primaryText" />
            ) : (
              <ArrowDownIcon edit="w-2 h-2 fill-primaryText" />
            )
          ) : null}
        </span>
      </button>
    );

  return null;
}

export function DropdownList({ children, edit }: PropsDropdown) {
  let changeStateDropdown = useContext(DisplayContext);

  if (changeStateDropdown.dropdown)
    return (
      <div
        className={`list-dropdown absolute right-0 z-[999] flex w-36 cursor-default flex-col gap-2 rounded-md bg-body py-5 shadow ${edit}`}
      >
        {children}
      </div>
    );

  return null;
}

export function DropdownItem({ children, edit, onClick }: PropsDropdown) {
  let changeStateDropdown = useContext(DisplayContext);
  return (
    <button
      className={`flex items-center gap-2 hover:bg-backgroundHover ${edit}`}
      onClick={(e) => {
        if (onClick) onClick();
        e.preventDefault();
        e.stopPropagation();
        changeStateDropdown.setDropdown(false);
      }}
    >
      {children}
    </button>
  );
}
