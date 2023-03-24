import React, { useContext, useState } from "react";
import QrcodeDisable from "./QrcodeDisable";
import QrcodeEnable from "./QrcodeEnable";
import Settings from "./Settings";
import { ActiveHome } from "../../Routes/Home";
import { ActiveProfile } from "../../Routes/Profile";
import { ActiveProfileUser } from "../../Routes/ProfileUser";
import { StateMssages } from "../../Routes/Messages";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsBody({ setOpen }: TypeProps) {
  let dataUserLogged = useContext(ActiveHome);
  let dataUserLoggedProfile = useContext(ActiveProfile);
  let dataUserLoggedProfileUser = useContext(ActiveProfileUser);
  let dataUserLoggedMessages = useContext(StateMssages);

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;

  const [pictureUser, setPictureUser] = useState<string>(dataUserLogged.value?dataUserLogged.settings.pictureURL:dataUserLoggedMessages.settings.pictureURL);
  const [value, setValue] = useState<string>(dataUserLogged.value?dataUserLogged.settings.nickname:dataUserLoggedMessages.settings.nickname);
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
