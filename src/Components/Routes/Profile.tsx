import React, { useEffect,createContext } from "react";
import Navigation from "../Navigation/Navigation";

export const ActiveProfile = createContext<boolean>(false)

export default function Home() {
  useEffect(() => {
    document.title = "Pong - Profile";
  }, []);

  return(
    <ActiveProfile.Provider value={true}>
      <Navigation />
      <main>
        Profile
      </main>
    </ActiveProfile.Provider>
  );
}
