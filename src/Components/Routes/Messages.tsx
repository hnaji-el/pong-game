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
    </ActiveMessages.Provider>
  );
}
