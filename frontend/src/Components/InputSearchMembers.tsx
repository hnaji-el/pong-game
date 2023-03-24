import React from "react";
import { SearchIcon } from "./Icons";

interface TypeProps {
  placeholder: string;
}

export default function InputSearchMembers({ placeholder }: TypeProps) {
  return (
    <div className="flex items-center rounded-md mx-4 bg-body pl-2">
      <SearchIcon edit="w-3.5 relative fill-secondaryText" />
      <input
        type="text"
        placeholder={placeholder}
        className="placeholder-secondary-text flex-1 bg-transparent py-3.5 px-3 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
      />
    </div>
  );
}
