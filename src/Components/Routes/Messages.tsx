import React, { useEffect, createContext, useState } from "react";
import NavigationChat from "../Navigation/NavigationChat";

interface TypeContext {
  active: boolean;
  click: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateMssages = createContext<TypeContext>({
  active: false,
  click: false,
  setClick: () => {},
});
export const ChatBox = createContext<boolean>(false);
export const Click = createContext<boolean>(false);
export default function Messages() {
  const [click, setClick] = useState(false);
  useEffect(() => {
    document.title = "Pong - Messages";
  }, []);

  return (
    <StateMssages.Provider value={{ active: true, click:click, setClick: setClick }}>
      <NavigationChat />
      <main
        className={`${
          click ? "" : "hidden"
        } lg:block mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4`}
      >
        Messages
      </main>
    </StateMssages.Provider>
  );
}
