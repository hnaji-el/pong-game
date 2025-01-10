import React from "react";

import { ExclamationIcon } from "../Icons";

interface TypeProps {
  edit?: string;
  editError?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  backgroundColor?: string;
}

function InputForm({
  edit,
  editError,
  value,
  setValue,
  label,
  errorMessage,
  setErrorMessage,
  backgroundColor,
}: TypeProps) {
  const inputId = React.useId();

  return (
    <div className={`flex flex-col gap-1.5 ${edit}`}>
      <label htmlFor={inputId} className="text-sm capitalize text-primaryText">
        {label}
      </label>
      <input
        type="text"
        id={inputId}
        placeholder={`Enter ${label}`}
        value={value}
        onChange={(e) => {
          setErrorMessage("");
          setValue(e.currentTarget.value);
        }}
        className={`${backgroundColor} placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${
          errorMessage.length ? "border-[1px] border-error" : ""
        }`}
      />

      {errorMessage.length > 0 && (
        <div
          className={`flex gap-1.5 fill-error text-xs font-medium text-error ${editError}`}
        >
          <ExclamationIcon edit="w-3 h-3 relative top-[.1rem]" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default InputForm;
