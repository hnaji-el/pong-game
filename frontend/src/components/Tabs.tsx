import React from "react";

import { getIndexElement } from "../utilities/helpers";

interface ContextType {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

export const indexTab = React.createContext<ContextType>({
  state: 0,
  setState: () => {},
  count: 0,
});

export function Tabs({
  children,
  className,
}: {
  children: JSX.Element[];
  className?: string;
}) {
  const [state, setState] = React.useState(0);

  return (
    <indexTab.Provider value={{ state: state, setState: setState, count: 0 }}>
      <div
        className={`flex h-full flex-col gap-6 lg:overflow-hidden ${className ? className : ""}`}
      >
        {children}
      </div>
    </indexTab.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: JSX.Element[];
  className?: string;
}) {
  return (
    <div className={`flex items-center text-sm ${className ? className : ""}`}>
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) {
  const tabs = React.useContext(indexTab);

  return (
    <button
      className={`flex flex-1 items-center justify-center border-b-[1px] pb-2 text-[13px] ${
        tabs.state === tabs.count++
          ? "border-b-primary text-primaryText"
          : "border-b-shape text-secondaryText"
      }`}
      onClick={(e) => {
        const index = getIndexElement(e);
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

export function TabsPanels({
  children,
  edit,
}: {
  children: JSX.Element[];
  edit?: string;
}) {
  const index = React.useContext(indexTab).state;
  let arrChildren = React.Children.toArray(children);

  return (
    <div className={`h-full overflow-hidden ${edit ? edit : ""}`}>
      {arrChildren[index]}
    </div>
  );
}

export function TabContent({
  children,
  edit,
}: {
  children: JSX.Element;
  edit?: string;
}) {
  return (
    <div className={`h-full overflow-hidden ${edit ? edit : ""}`}>
      {children}
    </div>
  );
}
