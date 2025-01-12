import React, { useState } from "react";
import { QrcodeValidation } from "../api/API";
import { checkDisableCode } from "../utilities/helpers";
import { KeyIcon } from "./Icons";
import InputForm from "./inputs/InputForm";
import { useNavigate } from "react-router-dom";

export default function FormTfa() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  return (
    <form className="flex flex-col items-center justify-center gap-16">
      <KeyIcon edit="w-28 h-28 fill-primary relative right-4" />
      <div className="flex w-80 flex-col gap-5">
        <InputForm
          label="Enter 2FA code"
          value={value}
          setValue={setValue}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          backgroundColor="bg-shape"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary p-2 text-sm text-primaryText"
          onClick={(e) => {
            e.preventDefault();
            let errorMessage = checkDisableCode(value);

            if (errorMessage.length) {
              setErrorMessage(errorMessage);
              return;
            }

            QrcodeValidation((res: any) => {
              if (res === "invalide") setErrorMessage("Code incorect");
              else {
                navigate("/home");
              }
            }, value);
          }}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}
