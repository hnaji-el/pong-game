import React, { useEffect,createContext } from "react";
import Navigation from "../Navigation/Navigation";

export const ActiveHome = createContext<boolean>(false)

export default function Home() {
  useEffect(() => {
    document.title = "Pong - Home";
  }, []);

  return(
    <ActiveHome.Provider value={true}>
      <Navigation />
      <main>
        Home
      </main>
    </ActiveHome.Provider>
  );
}
