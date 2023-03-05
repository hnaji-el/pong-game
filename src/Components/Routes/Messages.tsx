import React, { useEffect,createContext } from "react";
import NavigationChat from "../Navigation/NavigationChat";

export const ActiveMessages = createContext<boolean>(false)

export default function Messages() {
  useEffect(() => {
    document.title = "Pong - Messages";
  }, []);

  return(
    <ActiveMessages.Provider value={true}>
      <NavigationChat />
      <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4 ">
        Messages
      </main>
    </ActiveMessages.Provider>
  );
}
