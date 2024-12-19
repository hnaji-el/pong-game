import React, { useContext, useState } from "react";
import QrcodeDisable from "./QrcodeDisable";
import QrcodeEnable from "./QrcodeEnable";
import Settings from "./Settings";
import { ActiveHome } from "../../../pages/Home";
import { ActiveProfile } from "../../../pages/Profile";
import { ActiveProfileUser } from "../../../pages/ProfileUser";
import { StateMssages } from "../../../pages/Messages/Messages";
import { GameContext } from "../../../pages/Game";

interface TypeProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsBody({ setOpen }: TypeProps) {
  let dataUserLogged = useContext(ActiveHome);
  let dataUserLoggedProfile = useContext(ActiveProfile);
  let dataUserLoggedProfileUser = useContext(ActiveProfileUser);
  let dataUserLoggedMessages = useContext(StateMssages);
  let dataGame = useContext(GameContext);

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  if (!dataUserLogged.value) dataUserLogged = dataGame;

  const [pictureUser, setPictureUser] = useState<string>(
    dataUserLogged.value
      ? dataUserLogged.settings.pictureURL
      : dataUserLoggedMessages.settings.pictureURL,
  );
  const [tmpPicture, setTmpPicture] = useState<string>("");
  const [sendPicture, setSendPicture] = useState<{}>({});
  const [value, setValue] = useState<string>(
    dataUserLogged.value
      ? dataUserLogged.settings.nickname
      : dataUserLoggedMessages.settings.nickname,
  );
  const [tfa, setTfa] = useState<boolean>(false);
  const [enable, setEnable] = useState<boolean>(
    dataUserLogged.value
      ? dataUserLogged.settings.isTwoFactorAuthEnabled
      : dataUserLoggedMessages.settings.isTwoFactorAuthEnabled,
  );
  if (!tfa)
    return (
      <Settings
        setOpen={setOpen}
        setTfa={setTfa}
        enable={enable}
        pictureUser={pictureUser}
        setPictureUser={setPictureUser}
        sendPicture={sendPicture}
        setSendPicture={setSendPicture}
        tmpPicture={tmpPicture}
        setTmpPicture={setTmpPicture}
        value={value}
        setValue={setValue}
        dataUserLogged={
          dataUserLogged.value ? dataUserLogged : dataUserLoggedMessages
        }
      />
    );
  if (!enable) return <QrcodeEnable setTfa={setTfa} setEnable={setEnable} />;
  else return <QrcodeDisable setTfa={setTfa} setEnable={setEnable} />;
}
