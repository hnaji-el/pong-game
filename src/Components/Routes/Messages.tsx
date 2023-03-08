import React, { useEffect, createContext, useState } from "react";
import NavigationChat from "../Navigation/NavigationChat";
import ChatBox from "../ChatBox";

interface TypeContext {
  active: boolean;
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  firstClick: boolean;
  setFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateMssages = createContext<TypeContext>({
  active: false,
  click: false,
  setClick: () => { },
  firstClick: false,
  setFirstClick: () => {},
});
export const Click = createContext<boolean>(false);
export default function Messages() {
  const [click, setClick] = useState(false);
  
  const [firstClick, setFirstClick] = useState(true);
  useEffect(() => {
    document.title = "Pong - Messages";
  }, []);
  

  return (
    <StateMssages.Provider
      value={{ active: true, click: click, firstClick:firstClick, setFirstClick:setFirstClick ,setClick: setClick }}
    >
      <NavigationChat />
      <main
        className={`${
          click ? "" : "absolute w-0 h-0"
        } lg:block lg:relative lg:w-auto lg:h-auto mx-3 pb-20 lg:pb-1 pt-7 lg:ml-64 lg:mr-4 overflow-hidden`}
      >
        <ChatBox />
      </main>
    </StateMssages.Provider>
  );
}
