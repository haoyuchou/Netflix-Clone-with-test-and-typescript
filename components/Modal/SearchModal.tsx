import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import useDebounce from "../../hooks/useDebounce";
import { fetchSearch } from "../../lib/fetchSearch";
import { CardData } from "../../typings/card.types";

export interface Props {
  onClose: () => void;
}

function SearchModal({ onClose }: Props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchKeyWord = useDebounce(searchValue, 500);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    console.log("key word: ", searchKeyWord);
    const fetchMovie = async () => {
      const data = await fetchSearch(searchKeyWord, "movie");
      console.log("final data: ",data);
    };
    if (searchKeyWord !== "") {
      fetchMovie();
    }
  }, [searchKeyWord]);

  if (isBrowser) {
    return (
      <div className="fixed m-0 p-0 top-0 left-0 w-screen h-screen bg-black-rgba">
        <div className="max-h-12 pt-3 flex items-center justify-center">
          <div className="absolute left-3">
            <ArrowLeftIcon
              className="text-white h-6 md:h-8"
              onClick={onClose}
            />
          </div>

          <div className="flex">
            <MagnifyingGlassIcon className="h-8 text-white mr-1" />
            <input
              className="flex-grow pl-5 bg-black border-2 border-blue-500 outline-none text-white h-8 w-44 md:w-80"
              type="text"
              placeholder="Start your search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue((prev) => e.target.value)
              }
              value={searchValue}
            />
          </div>

          {/* <MagnifyingGlassIcon className="h-8 text-white rounded-full" /> */}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default SearchModal;
