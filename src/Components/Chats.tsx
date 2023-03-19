import React from "react";
import { CardConversation } from "./Cards";
import { SearchIcon } from "./Icons";

export default function Chats() {
  return (
    <div className="flex h-full flex-col  gap-6">
      <div className="flex items-center rounded-md bg-shape pl-2 mx-3 lg:mx-2">
        <SearchIcon edit="w-3 fill-secondaryText relative" />
        <input
          type="text"
          placeholder="Search for friend"
          className="placeholder-secondary-text flex-1 bg-transparent py-2.5 px-2 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
        />
      </div>
      <div className="flex h-full flex-col relative overflow-auto">
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
        <CardConversation />
      </div>
    </div>
  );
}
