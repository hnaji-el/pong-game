import React from "react";
import { SearchIcon } from "./Icons";

interface TypeProps{
  modal?:boolean
}

export default function SearchInput({modal}:TypeProps) {
  return (
    <div className={`${!modal?"hidden":""} lg:block flex-1 relative`}>
      <div className="flex items-center bg-shape pr-4 rounded-md">
        <input
          type="text"
          placeholder="Search for user"
          className="flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-4 pr-1.5 focus:outline-none text-primaryText"
        />
        <SearchIcon edit="w-4 fill-secondaryText" />
      </div>
    </div>
  );
}
