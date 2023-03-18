import React, { useState, useEffect, useRef } from "react";
import { SearchIcon } from "./Icons";
import SearchContainer from "./SearchContainer";

interface TypeProps {
  modal?: boolean;
}

export default function SearchInput({ modal }: TypeProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const refDropDown = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        refDropDown.current &&
        dropdown &&
        !refDropDown.current.contains(e.target as HTMLDivElement)
      )
        setDropdown(false);
    });
  }, [dropdown]);
  return (
    <div
      className={`${!modal ? "hidden" : ""} lg:block flex-1 relative`}
      ref={refDropDown}
    >
      <div className="flex items-center bg-shape pr-4 rounded-md">
        <input
          type="text"
          placeholder="Search for user"
          className="flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-4 pr-1.5 focus:outline-none text-primaryText"
          onClick={() => {
            setDropdown(true);
          }}
        />
        <SearchIcon edit="w-4 fill-secondaryText" />
      </div>
      {dropdown ? <SearchContainer /> : null}
    </div>
  );
}
