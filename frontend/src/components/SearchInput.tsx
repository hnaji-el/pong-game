import React from "react";

import { getDataUsers } from "../api/API";
import { filterByName } from "../utilities/helpers";
import { SearchIcon } from "./Icons";
import SearchContainer from "./SearchContainer";
import { IoChevronBackSharp } from "react-icons/io5";

interface TypeProps {
  modal?: boolean;
  closeModal?: () => void;
  setOpenSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypeData {
  id: string;
  nickname: string;
  pictureURL: string;
  isFriendToLoggedUser: boolean;
}

export default function SearchInput({
  setOpenSearch,
  closeModal,
  modal,
}: TypeProps) {
  const [dropdown, setDropdown] = React.useState(false);
  const refDropDown = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState<TypeData[]>([]);
  const [dataAllUsers, setDataAllUsers] = React.useState<TypeData[]>([]);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (dropdown) {
      getDataUsers((res: TypeData[]) => {
        setDataAllUsers(res);
        setData(res);
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
      className={`${!modal ? "hidden" : ""} relative flex-1 lg:block`}
      ref={refDropDown}
    >
      <div className="flex items-center gap-[8px]">
        {modal && (
          <button className="h-[44px]" onClick={closeModal}>
            <IoChevronBackSharp size={24} className="text-primaryText" />
          </button>
        )}
        <div className="flex flex-1 items-center rounded-md bg-shape pr-4">
          <input
            type="text"
            placeholder="Search for user"
            value={value}
            className="placeholder-secondary-text flex-1 bg-transparent p-3 pl-4 pr-1.5 text-sm font-light text-primaryText placeholder:text-sm placeholder:font-light focus:outline-none"
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
      </div>
      {data.length && dropdown ? (
        <SearchContainer
          setOpenSearch={setOpenSearch}
          setDropdown={setDropdown}
          data={data}
        />
      ) : null}
    </div>
  );
}
