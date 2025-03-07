import React from "react";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { ActiveHome } from "../../pages/Home/Home";
import { ActiveProfile } from "../../pages/Profile/Profile";
import { ActiveProfileUser } from "../../pages/ProfileUser/ProfileUser";
import { GameContext } from "../../pages/Game/Game";

export default function Navigation() {
  let dataUserLogged = React.useContext(ActiveHome);
  const dataUserLoggedProfile = React.useContext(ActiveProfile);
  const dataUserLoggedProfileUser = React.useContext(ActiveProfileUser);
  const dataUserLoggedGame = React.useContext(GameContext);

  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfile;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedProfileUser;
  if (!dataUserLogged.value) dataUserLogged = dataUserLoggedGame;

  return (
    <>
      <NavBar />

      <SideBar />
    </>
  );
}
