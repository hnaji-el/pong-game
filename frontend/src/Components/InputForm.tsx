import React from "react";
import { ExclamationIcon } from "./Icons";

interface TypeProps {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;

}

export default function InputForm({
  value,
  setValue,
  errorMessage,
  setErrorMessage
}: TypeProps) {
  
  return (
    <div className="flex w-full flex-col gap-1.5 lg:w-64">
      <label htmlFor="Username" className="text-sm text-primaryText">
        Username
      </label>
      <input
        type="text"
        className={`placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${errorMessage.length?'border-[1px] border-error':''}`}
        placeholder="Enter username"
        value={value}
        onChange={(e) => {
          setErrorMessage("");
          if (setValue) setValue(e.currentTarget.value);
        }}
      />
      {errorMessage.length ? (
        <div className="text-error text-xs font-medium fill-error flex gap-1.5">
          <ExclamationIcon edit="w-3 h-3 relative top-0.5" />
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </div>
  );
}
