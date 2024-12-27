import React from "react";

import PrivateChannel from "../PrivateChannel";
import ProtectedChannel from "../ProtectedChannel";
import PublicChannel from "../PublicChannel";
import { CheckIcon } from "../Icons";

type ChannelType = "PUBLIC" | "PRIVATE" | "PROTECTED";
type CreateChannelModalPropsType = {
  closeModal: () => void;
};
type ButtonPropsType = {
  children: string;
  isClicked: boolean;
  onClick: () => void;
};

function CreateChannelModal({ closeModal }: CreateChannelModalPropsType) {
  const [type, setType] = React.useState<ChannelType>("PUBLIC");

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

        {type === "PUBLIC" && <PublicChannel closeModal={closeModal} />}
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
        aria-label="Check"
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
