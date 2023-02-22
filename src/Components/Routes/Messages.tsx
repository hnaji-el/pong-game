import React, { useEffect,createContext } from "react";
import Navigation from "../Navigation/Navigation";

export const ActiveMessages = createContext<boolean>(false)

export default function Messages() {
  useEffect(() => {
    document.title = "Pong - Messages";
  }, []);

  return(
    <ActiveMessages.Provider value={true}>
      <Navigation />
      <main>
        Messages
      </main>
    </ActiveMessages.Provider>
  );
}
