import React, { useState } from "react";
import userImg from "../../../assets/user.jpg";
import QrcodeDisable from "./QrcodeDisable";
import QrcodeEnable from "./QrcodeEnable";
import Settings from "./Settings";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsBody({ setOpen }: TypeProps) {
  const [pictureUser, setPictureUser] = useState<string>(userImg);
  const [value, setValue] = useState<string>("mouassit");
  const [tfa, setTfa] = useState<boolean>(false);
  const [enable, setEnable] = useState<boolean>(false);
  if (!tfa)
    return (
      <Settings
        setOpen={setOpen}
        setTfa={setTfa}
        enable={enable}
        pictureUser={pictureUser}
        setPictureUser={setPictureUser}
        value={value}
        setValue={setValue}
      />
    );
  if (!enable) return <QrcodeEnable setTfa={setTfa} setEnable={setEnable} />;
  else return <QrcodeDisable setTfa={setTfa} setEnable={setEnable} />;
}
