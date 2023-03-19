import React, { useState, useEffect, useRef } from "react";
import DropDownPassword from "./DropDownPassword";
import { EyeChannelIcon } from "./Icons";

export default function PasswordChannel() {
  const [channelPassword, setChannelPassword] = useState<boolean>(false);
  const refDropDown = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        refDropDown.current &&
        channelPassword &&
        !refDropDown.current.contains(e.target as HTMLDivElement)
      )
        setChannelPassword(false);
    });
  }, [channelPassword]);

  return (
    <div className="relative" ref={refDropDown}>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-shape hover:bg-backgroundHover"
        onClick={() => {
          channelPassword
            ? setChannelPassword(false)
            : setChannelPassword(true);
        }}
      >
        <EyeChannelIcon edit="fill-secondaryText w-5 h-5" />
      </button>
      {channelPassword ? (
        <DropDownPassword setChannelPassword={setChannelPassword} />
      ) : null}
    </div>
  );
}
