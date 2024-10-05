import React, { useEffect, useState } from "react";
import { generateQrCode, QrcodeValidation } from "../../../API/API";
import { checkEnableCode } from "../../../helpers/helpers";
import InputForm from "../../InputForm";

interface TypeProps {
  setTfa: React.Dispatch<React.SetStateAction<boolean>>;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QrcodeEnable({ setTfa, setEnable }: TypeProps) {
  const [Qrcode, setQrCode] = useState<string>();

  useEffect(() => {
    generateQrCode((res: any) => {
      setQrCode(res);
    });
  }, []);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  return (
    <form className="flex items-center">
      <div className="flex gap-10 lg:gap-12 flex-col lg:flex-row items-center">
        <div className="h-32 w-32 rounded-lg bg-white p-1.5">
          <img src={Qrcode} alt="Qr code" />
        </div>
        <div className="flex w-full gap-6 flex-col lg:w-64">
          <InputForm
            label="code"
            value={value}
            setValue={setValue}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <div className="flex w-full items-center justify-end gap-3">
            <button
              type="button"
              className="w-32 rounded-md bg-shape p-2 text-sm text-primaryText shadow"
              onClick={() => {
                setTfa(false);
              }}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-32 rounded-md bg-primary p-2 text-sm text-primaryText"
              onClick={(e) => {
                e.preventDefault();
                let errorMessage = checkEnableCode(value);

                if (errorMessage.length) {
                  setErrorMessage(errorMessage);
                  return;
                }

                QrcodeValidation((res: any) => {
                  if (res === "invalide") setErrorMessage("Code incorect");
                  else {
                    setEnable(true);
                    setTfa(false);
                  }
                }, value);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
