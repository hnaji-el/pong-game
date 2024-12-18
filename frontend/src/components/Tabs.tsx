import React, { createContext, useContext, useState, Children } from "react";
import { getIndexElement } from "../utilities/helpers";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  edit?: string;
  onClick?: any;
}

interface TypeContext {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

export const indexTab = createContext<TypeContext>({
  state: 0,
  setState: () => {},
  count: 0,
});

export function Tabs({ children, edit }: Props) {
  const [state, setState] = useState<number>(0);

  return (
    <indexTab.Provider value={{ state: state, setState: setState, count: 0 }}>
      <div className={`flex h-full flex-col gap-6 lg:overflow-hidden ${edit}`}>
        {children}
      </div>
    </indexTab.Provider>
  );
}

export function TabsList({ children, edit }: Props) {
  return <div className={`flex items-center text-sm ${edit}`}>{children}</div>;
}

export function Tab({ children, onClick }: Props) {
  const tabs = useContext(indexTab);

  return (
    <button
      className={`flex flex-1 items-center justify-center border-b-[1px] pb-2 text-[13px] ${
        tabs.state === tabs.count++
          ? "border-b-primary text-primaryText"
          : "border-b-shape text-secondaryText"
      }`}
      onClick={(e) => {
        let index = getIndexElement(e);
        tabs.setState(index);
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
}

export function TabsPanels({ children, edit }: Props) {
  const index = useContext(indexTab).state;
  let arrChildren = Children.toArray(children);
  return (
    <div className={`h-full overflow-hidden ${edit}`}>{arrChildren[index]}</div>
  );
}

export function TabContent({ children, edit }: Props) {
  return <div className={`h-full overflow-hidden ${edit}`}>{children}</div>;
}
