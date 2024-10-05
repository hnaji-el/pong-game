import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { firstLetterCapital } from "../utilities/helpers";
import { ArrowDownIcon, ArrowUpIcon, FriendIcon } from "./Icons";

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
      <div className="relative text-primaryText text-sm" ref={refDropDown}>
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
          if (changeStateDropdown.dropdown) {
            changeStateDropdown.setDropdown(false);
            return;
          }
          changeStateDropdown.setDropdown(true);
        }}
      >
        <div className="flex items-center gap-2">
          {imgTitle ? (
            <img src={imgTitle} alt="User" className="w-10 h-10 rounded-full" />
          ) : null}
          <span className="max-w-[9.6rem] overflow-hidden text-ellipsis	whitespace-nowrap">
            {title ? firstLetterCapital(title) : null}
          </span>
        </div>
        {arrow ? (
          <span className="bg-shape w-4 h-4 rounded-full flex justify-center items-center">
            {changeStateDropdown.dropdown ? (
              <ArrowUpIcon edit="w-1.5 h-1.5 fill-secondaryText" />
            ) : (
              <ArrowDownIcon edit="w-1.5 h-1.5 fill-secondaryText" />
            )}
          </span>
        ) : null}
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
        className="w-36 p-2 rounded-md bg-shape gap-6 flex items-center justify-center"
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
          <span className="text-primaryText text-sm">{title}</span>
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
        className={`absolute rounded-md bg-body shadow right-0 w-36 flex flex-col py-5 gap-2 z-[999] list-dropdown cursor-default  ${edit}`}
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
      className={`flex gap-2 hover:bg-backgroundHover items-center ${edit}`}
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
