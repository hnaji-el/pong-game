import React, { createContext, useContext, useState, Children } from "react";
import { getIndexElement } from "../helpers";

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  edit?: string;
}

interface typeContext {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

export const indexTab = createContext<typeContext>({
  state: 0,
  setState: () => { },
  count: 0,
});

export function Tabs({ children, edit }: Props) {
  const [state, setState] = useState<number>(0);

  return (
    <indexTab.Provider value={{ state: state, setState: setState,count: 0 }}>
      <div className={`flex flex-col gap-6 h-full lg:overflow-hidden ${edit}`}>
        {children}
      </div>
    </indexTab.Provider>
  );
}

export function TabsList({ children }: Props) {
  return <div className="text-sm flex items-center px-2">{children}</div>;
}

export function Tab({ children }: Props) {
  const tabs = useContext(indexTab);
  console.log(tabs);
  
  return (
    <button
      className= {`flex-1 flex justify-center items-center pb-2 border-b-[1px] ${tabs.state === tabs.count++ ?"text-primaryText border-b-primary":"text-secondaryText border-b-shape"}`}
      onClick={(e) => {
        let index = getIndexElement(e);
        tabs.setState(index);
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
