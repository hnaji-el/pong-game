import React, { useState } from "react";
import { checkNickname } from "../helpers";
import InputForm from "./InputForm";
import { EditAvatarIcon } from "./Icons";
import { useNavigate } from "react-router-dom";

interface TypeProps {
  data: {
    id: string;
    pictureURL: string;
    nickname: string;
  };
}

export default function FormEdit({ data }: TypeProps) {
  const [pictureUser, setPictureUser] = useState<string>(data.pictureURL);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>(data.nickname);
  let navigate = useNavigate();
  return (
    <form className="flex items-center">
      <div className="flex gap-10 lg:gap-12 flex-col lg:flex-row items-center">
        <div className="flex flex-col items-center gap-6">
          <img
            src={pictureUser}
            alt="User"
            className="h-24 w-24 rounded-full"
          />
          <button
            type="button"
            className="flex w-28 items-center justify-center gap-1 rounded-md bg-primary p-2 text-sm text-primaryText"
            onClick={() => {
              let inputFile = document.getElementById("file");
              inputFile?.click();
            }}
          >
            <EditAvatarIcon edit="w-5 h-5 fill-primaryText" />
            <span>Avatar</span>
            <input
              type="file"
              id="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) {
                  let extention = e.target.files[0].name.split(".").pop();
                  if (
                    extention === "png" ||
                    extention === "PNG" ||
                    extention === "jpeg" ||
                    extention === "JPEG" ||
                    extention === "jpg" ||
                    extention === "JPG"
                  ) {
                    setPictureUser(URL.createObjectURL(e.target.files[0]));
                  }
                }
              }}
            />
          </button>
        </div>
        <div className="flex gap-5 flex-col w-80">
          <InputForm
            label="username"
            value={value}
            setValue={setValue}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            backgroundColor="bg-shape"
          />
          <div className="flex w-full items-center flex-col lg:flex-row gap-3">
            <button
              type="button"
              className="w-full rounded-md bg-backgroundHover p-2 text-sm text-primaryText shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full rounded-md bg-primary p-2 text-sm text-primaryText"
              onClick={(e) => {
                e.preventDefault();
                let errorMessage = checkNickname(value);

                if (errorMessage.length) {
                  setErrorMessage(errorMessage);
                  return;
                }
                navigate("/Home");
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
