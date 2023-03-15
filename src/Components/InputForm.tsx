import React from "react";
import { ExclamationIcon } from "./Icons";

interface TypeProps {
  edit?: string;
  editError?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputForm({
  edit,
  editError,
  value,
  setValue,
  label,
  errorMessage,
  setErrorMessage,
}: TypeProps) {
  return (
    <div className={`flex w-full flex-col gap-1.5 ${edit}`}>
      <label htmlFor={label} className="text-sm text-primaryText capitalize">
        {label}
      </label>
      <input
        type="text"
        className={`placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${
          errorMessage.length ? "border-[1px] border-error" : ""
        }`}
        placeholder={`Enter ${label}`}
        value={value}
        onChange={(e) => {
          setErrorMessage("");
          if (setValue) setValue(e.currentTarget.value);
        }}
      />
      {errorMessage.length ? (
        <div className={`text-error text-xs font-medium fill-error flex gap-1.5 ${editError}`}>
          <ExclamationIcon edit="w-3 h-3 relative top-0.5" />
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </div>
  );
}
