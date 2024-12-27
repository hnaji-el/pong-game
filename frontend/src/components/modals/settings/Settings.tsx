import React, { useState } from "react";
import {
  editNickname,
  editPicture,
  getDataUserLogged,
  turnOffTfa,
  turOnTfa,
} from "../../../api/API";
import { checkNickname } from "../../../utilities/helpers";
import { EditAvatarIcon } from "../../Icons";
import InputForm from "../../InputForm";

interface PropsType {
  closeModal: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  pictureUser: string;
  setPictureUser: React.Dispatch<React.SetStateAction<string>>;
  tmpPicture: string;
  setTmpPicture: React.Dispatch<React.SetStateAction<string>>;
  sendPicture: {};
  setSendPicture: React.Dispatch<React.SetStateAction<{}>>;
  setTfa: React.Dispatch<React.SetStateAction<boolean>>;
  enable: boolean;
  dataUserLogged: any;
}

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
  isTwoFactorAuthEnabled: boolean;
  status: string;
}

function Settings({
  closeModal,
  value,
  setValue,
  pictureUser,
  setPictureUser,
  tmpPicture,
  setTmpPicture,
  sendPicture,
  setSendPicture,
  setTfa,
  enable,
  dataUserLogged,
}: PropsType) {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <form className="flex flex-col justify-between py-6">
      <div>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <div className="flex flex-col items-center gap-3">
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
          <div className="flex flex-col justify-start gap-6">
            <InputForm
              edit="w-full lg:w-64"
              value={value}
              setValue={setValue}
              label="username"
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-primaryText">
                <span>{enable ? "Disable" : "Enable"}</span> 2FA
              </span>
              <button
                type="button"
                className={`flex h-7 w-12 px-1 ${
                  enable ? "justify-end bg-primary" : "justify-start bg-body"
                } items-center rounded-full`}
                onClick={() => {
                  setTfa(true);
                }}
              >
                <span className="h-5 w-5 rounded-full bg-primaryText"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        <button
          className="w-32 rounded-md bg-shape p-2 text-sm text-primaryText shadow"
          type="button"
          onClick={() => {
            closeModal();
            document.body.style.overflow = "auto";
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-32 rounded-md bg-primary p-2 text-sm text-primaryText"
          onClick={async (e) => {
            e.preventDefault();
            let errorMessage = checkNickname(value);

            if (errorMessage.length) {
              setErrorMessage(errorMessage);
              return;
            }

            if (tmpPicture.length) await editPicture(sendPicture);
            await editNickname((res: any) => {
              if (res === "invalid") setErrorMessage("Username already exists");
              else {
                if (enable) turOnTfa();
                else turnOffTfa();

                getDataUserLogged((res: TypeData) => {
                  dataUserLogged.updateSettings(res);
                  closeModal();
                  document.body.style.overflow = "auto";
                });
              }
            }, value);
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default Settings;
