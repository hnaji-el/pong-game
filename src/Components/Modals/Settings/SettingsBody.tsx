import React, { useState, createContext } from "react";
import Settings from "./Settings";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnableContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

export default function SettingsBody({ setOpen }: TypeProps) {
  const [enable, setEnable] = useState<boolean>(false);

  return (
    <EnableContext.Provider value={setEnable}>
      <Settings setOpen={setOpen} />;
    </EnableContext.Provider>
  );
}
