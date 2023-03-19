import React, { useState } from "react";
import { checkDisableCode } from "../../helpers";
import { KeyIcon } from "../Icons";
import InputForm from "../InputForm";

export default function FormTfa() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  return (
    <form className="flex flex-col justify-center items-center gap-16">
      <KeyIcon edit="w-28 h-28 fill-primary relative right-4" />
      <div className="w-80 flex flex-col gap-5">
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
          }}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}
