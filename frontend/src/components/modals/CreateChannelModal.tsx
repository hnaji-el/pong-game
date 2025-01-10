import React from "react";

import PrivateChannel from "../PrivateChannel";
import ProtectedChannel from "../ProtectedChannel";
import PublicChannel from "../PublicChannel";
import { CheckIcon } from "../Icons";

import { ChannelType } from "../../pages/Chat/types";

interface CreateChannelModalPropsType {
  setChannels: React.Dispatch<React.SetStateAction<ChannelType[]>>;
  closeModal: () => void;
}

interface ButtonPropsType {
  children: React.ReactNode;
  isClicked: boolean;
  onClick: () => void;
}

function CreateChannelModal({
  setChannels,
  closeModal,
}: CreateChannelModalPropsType) {
  const [type, setType] = React.useState<"PUBLIC" | "PRIVATE" | "PROTECTED">(
    "PUBLIC",
  );

  return (
    <div className="flex w-full items-center">
      <div className="flex w-full flex-col gap-11">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-0">
          <Button
            isClicked={type === "PUBLIC"}
            onClick={() => setType("PUBLIC")}
          >
            public
          </Button>
          <Button
            isClicked={type === "PRIVATE"}
            onClick={() => setType("PRIVATE")}
          >
            private
          </Button>
          <Button
            isClicked={type === "PROTECTED"}
            onClick={() => setType("PROTECTED")}
          >
            protected
          </Button>
        </div>

        {type === "PUBLIC" && (
          <PublicChannel setChannels={setChannels} closeModal={closeModal} />
        )}
        {type === "PRIVATE" && <PrivateChannel closeModal={closeModal} />}
        {type === "PROTECTED" && <ProtectedChannel closeModal={closeModal} />}
      </div>
    </div>
  );
}

function Button({ children, isClicked, onClick }: ButtonPropsType) {
  return (
    <button
      className="flex w-80 items-center gap-3 rounded-md bg-body p-2.5 lg:w-40"
      onClick={onClick}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          isClicked ? "bg-primary" : "border-2 border-primary"
        }`}
      >
        {isClicked && <CheckIcon edit="w-4 h-4 fill-primaryText" />}
      </span>
      <span className="text-md font-light capitalize text-primaryText">
        {children}
      </span>
    </button>
  );
}

export default CreateChannelModal;
