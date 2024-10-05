import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  PointsBottom,
  PointsTop,
} from "../PongElements";
import logo from "../../assets/logo.svg";
import FormEdit from "../FormEdit";
import { CheckToken, getDataUserLogged } from "../../API/API";
import Spinner from "../Spinner";

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
}

export default function Edit() {
  CheckToken();
  const [dataLoggedUser, setDataLoggedUser] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
  });
  useEffect(() => {
    document.title = "Pong - Edit Profile";
    getDataUserLogged((res: TypeData) => {
      setDataLoggedUser(res);
    });
  }, []);

  if (dataLoggedUser.nickname.length)
    return (
      <div className="flex flex-col gap-10 h-full">
        <header className="p-10 flex justify-center lg:justify-start">
          <Link to="/Login">
            <img src={logo} alt="Pong logo" className="w-48" />
          </Link>
        </header>
        <main className="relative h-full mx-3 mb-3 lg:mb-10 lg:mx-10">
          <PointsTop edit="absolute top-0 left-0 w-7 lg:w-[1.8rem]" />
          <ArrowRight edit="absolute bottom-0 left-0 w-9 lg:w-[2.5rem]" />
          <PointsBottom edit="absolute bottom-0 right-0 w-16 w-[4.1rem]" />
          <ArrowLeft edit="absolute top-0 right-0 w-9 lg:w-[2.5rem]" />
          <div className="flex items-center gap-60 w-full justify-center h-full relative bottom-5 ">
            <FormEdit data={dataLoggedUser} />
          </div>
        </main>
      </div>
    );

  return (
    <div className="mx-3 flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
}
