import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { firstLetterCapital } from "../helpers";
import { ArrowDownIcon, ArrowUpIcon } from "./Icons";

interface PropsDropdown {
  children?: JSX.Element | JSX.Element[] | string;
  edit?: string;
  onClick?: () => void;
}

interface PropsDropdownBtn {
  type: string;
  title: string;
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
            {firstLetterCapital(title)}
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

  return null;
}

export function DropdownList({ children }: PropsDropdown) {
  let changeStateDropdown = useContext(DisplayContext);

  if (changeStateDropdown.dropdown)
    return (
      <div className="absolute top-12 rounded-md bg-body shadow right-0 w-36 flex flex-col py-5 gap-2">
        {children}
      </div>
    );

  return null;
}

export function DropdownItem({ children,onClick }: PropsDropdown) {
  let changeStateDropdown = useContext(DisplayContext);
  return (
    <button
      className="flex gap-2 hover:bg-backgroundHover items-center justify-center p-2"
      onClick={() => {
        if(onClick)
          onClick();
        changeStateDropdown.setDropdown(false);
      }}
    >
      {children}
    </button>
  );
}
