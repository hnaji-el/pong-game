import React from "react";
import { EditAvatarIcon } from "../../Icons";

interface TypeProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  pictureUser: string;
  setPictureUser: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTfa: React.Dispatch<React.SetStateAction<boolean>>;
  enable: boolean;
}

export default function Settings({
  value,
  setValue,
  pictureUser,
  setPictureUser,
  setOpen,
  setTfa,
  enable,
}: TypeProps) {
  return (
    <div className="flex flex-col justify-between py-6">
      <div>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <div className="flex flex-col items-center gap-3">
            <img
              src={pictureUser}
              alt="User"
              className="h-24 w-24 rounded-full"
            />
            <button
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
          <div className="flex flex-col justify-start gap-6">
            <div className="flex w-full flex-col gap-1.5 lg:w-64">
              <label htmlFor="Username" className="text-sm text-primaryText">
                Username
              </label>
              <input
                type="text"
                className={`placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light`}
                placeholder="Enter username"
                value={value}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primaryText">
                <span>{enable ? "Disable" : "Enable"}</span> 2FA
              </span>
              <button
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
          onClick={() => {
            setOpen(false);
            document.body.style.overflow = "auto";
          }}
        >
          Cancel
        </button>
        <button
          className="w-32 rounded-md bg-primary p-2 text-sm text-primaryText"
          onClick={() => {
            setOpen(false);
            document.body.style.overflow = "auto";
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
