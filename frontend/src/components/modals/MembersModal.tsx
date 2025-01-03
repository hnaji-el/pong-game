import React from "react";

import { ExclamationIcon } from "../Icons";
import Spinner from "../Spinner";
import { getMembersChannel } from "../../api/API";

import { ChannelType, MemberType } from "../../pages/Chat/types";
import MemberCard from "../MemberCard";
import { UserType } from "../../api/types";

interface PropsType {
  chatDataBox: ChannelType;
  userData: UserType;
}

function MembersModal({ chatDataBox, userData }: PropsType) {
  const [members, setMembers] = React.useState<MemberType[]>([]);
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    getMembersChannel((members) => {
      setMembers(members);
      setRender(true);
    }, chatDataBox.name);
  }, [chatDataBox.name]);

  if (!render) {
    return (
      <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
        <Spinner size={36} />
      </div>
    );
  }

  return members.length ? (
    <div className="flex w-full flex-col gap-6 pt-5">
      <div
        className={`flex max-h-[34rem] flex-col overflow-auto ${
          members.length > 4 ? "relative" : ""
        }`}
      >
        <div className="flex flex-col gap-6">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              setMembers={setMembers}
              channelId={chatDataBox.id}
              channelName={chatDataBox.name}
              channelUserRole={chatDataBox.role}
              userData={userData}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex w-full items-center justify-center gap-1 p-8 pb-[1rem] text-sm text-secondaryText">
      <ExclamationIcon edit="w-5 h-4 fill-secondaryText relative top-[.1rem]" />
      You are the only one in this room.
    </div>
  );
}

export default MembersModal;
