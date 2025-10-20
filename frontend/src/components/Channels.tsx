import React from "react";

import { PlusIcon } from "./Icons";
import { Rooms, Status } from "../pages/Chat/types";
import Modal from "./Modal/Modal";
import useToggle from "../hooks/use-toggle";
import CreateChannelModal from "./modals/CreateChannelModal";
import ChannelCardList from "./ChannelCardList";

interface PropsType {
  rooms: Rooms;
  setRooms: React.Dispatch<React.SetStateAction<Rooms>>;
  status: Status;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function Channels({ rooms, setRooms, status, setToggle }: PropsType) {
  const [isCreateChannelModalOpen, toggleIsCreateChannelModalOpen] =
    useToggle(false);

  return (
    <>
      {isCreateChannelModalOpen && (
        <Modal
          title="create channel"
          handleDismiss={toggleIsCreateChannelModalOpen}
        >
          <CreateChannelModal
            rooms={rooms}
            setRooms={setRooms}
            handleDismiss={toggleIsCreateChannelModalOpen}
          />
        </Modal>
      )}

      <div className="flex grow flex-col gap-6 overflow-hidden">
        <div className="mx-3 flex items-center gap-2 lg:mx-2">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-[.3rem] bg-primary p-2"
            onClick={toggleIsCreateChannelModalOpen}
          >
            <PlusIcon edit="w-2.5 h-2.5 fill-primaryText" />
            <span className="text-sm font-light capitalize text-primaryText">
              add channel
            </span>
          </button>
        </div>

        <ChannelCardList
          title="joined channels:"
          channels={rooms.joinedChannels}
          status={status}
          setToggle={setToggle}
        />

        <ChannelCardList
          title="not joined channels:"
          channels={rooms.notJoinedChannels}
          status={status}
          setToggle={setToggle}
        />
      </div>
    </>
  );
}

export default Channels;
