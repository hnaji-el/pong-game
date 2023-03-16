import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { firstLetterCapital } from "../helpers";
import { ArrowDownIcon, ArrowUpIcon, PointsIcon } from "./Icons";

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
        className="flex h-4 w-4 items-center justify-center rounded-full bg-shape p-1 hover:bg-backgroundHover"
        onClick={() => {
          if (changeStateDropdown.dropdown) {
            changeStateDropdown.setDropdown(false);
            return;
          }
          changeStateDropdown.setDropdown(true);
        }}
      >
        <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
      </button>
    );

  return null;
}

export function DropdownList({ children, edit }: PropsDropdown) {
  let changeStateDropdown = useContext(DisplayContext);

  if (changeStateDropdown.dropdown)
    return (
      <div
        className={`absolute rounded-md bg-body shadow right-0 w-36 flex flex-col py-5 gap-2 z-[999] ${edit}`}
      >
        {children}
      </div>
    );

  return null;
}

export function DropdownItem({ children, onClick }: PropsDropdown) {
  let changeStateDropdown = useContext(DisplayContext);
  return (
    <button
      className="flex gap-2 hover:bg-backgroundHover items-center justify-center p-2"
      onClick={() => {
        if (onClick) onClick();
        changeStateDropdown.setDropdown(false);
      }}
    >
      {children}
    </button>
  );
}
