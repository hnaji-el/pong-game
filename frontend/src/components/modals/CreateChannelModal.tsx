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
  isClicked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function CreateChannelModal({
  setChannels,
  closeModal,
}: CreateChannelModalPropsType) {
  const [type, setType] = React.useState<"PUBLIC" | "PRIVATE" | "PROTECTED">(
    "PUBLIC",
  );

  return (
    <div className="flex flex-col gap-[46px] pb-[30px] pt-[46px]">
      <div className="flex flex-col items-center gap-[32px] lg:flex-row">
        <Button isClicked={type === "PUBLIC"} onClick={() => setType("PUBLIC")}>
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
      {type === "PRIVATE" && (
        <PrivateChannel setChannels={setChannels} closeModal={closeModal} />
      )}
      {type === "PROTECTED" && (
        <ProtectedChannel setChannels={setChannels} closeModal={closeModal} />
      )}
    </div>
  );
}

function Button({ isClicked, onClick, children }: ButtonPropsType) {
  return (
    <button
      className="flex w-full max-w-[320px] items-center gap-[12px] rounded-md bg-body p-[10px] lg:w-[160px]"
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
