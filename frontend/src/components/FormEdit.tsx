import React, { useState } from "react";
import { checkNickname } from "../utilities/helpers";
import InputForm from "./inputs/InputForm";
import { EditAvatarIcon } from "./Icons";
import { useNavigate } from "react-router-dom";
import { editNickname, editPicture } from "../api/API";

interface TypeProps {
  data: {
    id: string;
    pictureURL: string;
    nickname: string;
  };
}

export default function FormEdit({ data }: TypeProps) {
  const [pictureUser, setPictureUser] = useState<string>(data.pictureURL);
  const olpictureUser = data.pictureURL;
  const [tmpPicture, setTmpPicture] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>(data.nickname);
  const oldvalue = data.nickname;
  const [sendPicture, setSendPicture] = useState<{}>({});
  let navigate = useNavigate();
  return (
    <form className="flex items-center">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12">
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
                    setSendPicture(e.target.files[0]);
                    setPictureUser(URL.createObjectURL(e.target.files[0]));
                    setTmpPicture(URL.createObjectURL(e.target.files[0]));
                  }
                }
              }}
            />
          </button>
        </div>
        <div className="flex w-80 flex-col gap-5">
          <InputForm
            label="username"
            value={value}
            setValue={setValue}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            backgroundColor="bg-shape"
          />
          <div className="flex w-full flex-col items-center gap-3 lg:flex-row">
            <button
              type="button"
              className="w-full rounded-md bg-backgroundHover p-2 text-sm text-primaryText shadow"
              onClick={() => {
                setSendPicture({});
                setTmpPicture("");
                setPictureUser(olpictureUser);
                setValue(oldvalue);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full rounded-md bg-primary p-2 text-sm text-primaryText"
              onClick={async (e) => {
                e.preventDefault();
                let errorMessage = checkNickname(value);

                if (errorMessage.length) {
                  setErrorMessage(errorMessage);
                  return;
                }
                if (tmpPicture.length) await editPicture(sendPicture);
                await editNickname((res: any) => {
                  if (res === "invalid")
                    setErrorMessage("Username already exists");
                  else navigate("/home");
                }, value);
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
