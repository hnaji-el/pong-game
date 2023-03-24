import React, { useState, useEffect, useRef } from "react";
import {getDataUsers } from "../API";
import { filterByName } from "../helpers";
import { SearchIcon } from "./Icons";
import SearchContainer from "./SearchContainer";

interface TypeProps {
  modal?: boolean;
}

interface TypeData {
  id: number;
  nickname: string;
  pictureURL: string;
  isFriendToLoggedUser: boolean;
}

export default function SearchInput({ modal }: TypeProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const refDropDown = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<TypeData[]>([]);
  const [dataAllUsers, setDataAllUsers] = useState<TypeData[]>([]);
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    if (dropdown) {
      getDataUsers((res: TypeData[]) => {
        setDataAllUsers(res);
        setData(res)
      });
    }
      
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
          value={value}
          className="flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-4 pr-1.5 focus:outline-none text-primaryText"
          onClick={() => {
            setDropdown(true);
          }}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            setData(filterByName(dataAllUsers, e.currentTarget.value));
          }}
        />
        <SearchIcon edit="w-4 fill-secondaryText" />
      </div>
      {data.length && dropdown ? <SearchContainer data={data} /> : null}
    </div>
  );
}
