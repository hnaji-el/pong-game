import React from "react";

interface TypeProps {
  setTfa: React.Dispatch<React.SetStateAction<boolean>>;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QrcodeDisable({ setTfa, setEnable }: TypeProps) {
  return (
    <div className="flex items-center">
      <div className="flex gap-10 lg:gap-12 flex-col lg:flex-row items-center">
        <div className="flex w-full gap-6 flex-col lg:w-64">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="Code" className="text-sm text-primaryText">
              Code
            </label>
            <input
              type="text"
              className={`placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light`}
              placeholder="Enter code"
            />
          </div>
          <div className="flex w-full items-center justify-end gap-3">
            <button
              className="w-32 rounded-md bg-shape p-2 text-sm text-primaryText shadow"
              onClick={() => {
                setTfa(false);
              }}
            >
              Back
            </button>
            <button
              className="w-32 rounded-md bg-primary p-2 text-sm text-primaryText"
              onClick={() => {
                setEnable(false);
                setTfa(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
