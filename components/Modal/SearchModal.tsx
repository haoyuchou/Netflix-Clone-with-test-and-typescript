import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import useDebounce from "../../hooks/useDebounce";
import { fetchSearch } from "../../lib/fetchSearch";
import { CardData } from "../../typings/card.types";
import SearchLoadingSpinner from "../UI/SearchLoadingSpinner";

export interface Props {
  onClose: () => void;
}

function SearchModal({ onClose }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<CardData[]>([]);
  const searchResultFound =
    searchResult.length &&
    searchResult[0].name !== "sorry, there is no match found";
  const [isLoading, setIsLoading] = useState(false);
  const searchKeyWord = useDebounce(searchValue, 800);

  useEffect(() => {
    setIsLoading((prev) => true);
    const fetchMovieTV = async () => {
      const movieData = await fetchSearch(searchKeyWord, "movie");
      const tvData = await fetchSearch(searchKeyWord, "tv");
      console.log("final movie data: ", movieData);
      console.log("final tv data: ", tvData);

      setIsLoading((prev) => false);
      if (
        movieData[0].name === "sorry, there is no match found" &&
        tvData[0].name === "sorry, there is no match found"
      ) {
        // not any result found
        setSearchResult(movieData);
        return;
      } else if (movieData[0].name === "sorry, there is no match found") {
        // only tv result
        setSearchResult((prev) => tvData);
      } else if (tvData[0].name === "sorry, there is no match found") {
        setSearchResult(
          (prev) =>
            // only movie result
            movieData
        );
      } else {
        // both tv and movie result found
        const movieTvData = movieData.concat(tvData);
        setSearchResult((prev) => movieTvData);
      }
    };

    if (searchKeyWord !== "") {
      fetchMovieTV();
    }
  }, [searchKeyWord]);

  console.log("Search result: ", searchResult);

  return (
    <div className="fixed m-0 p-0 top-0 left-0 w-screen h-[100vh] bg-black-rgba overflow-x-hidden overflow-y-scroll">
      {/* leave icon and search bar */}
      <div className="max-h-12 pt-3 flex items-center justify-center">
        <div className="absolute left-3">
          <ArrowLeftIcon className="text-white h-6 md:h-8" onClick={onClose} />
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
      </div>

      {/* search result found */}
      {searchKeyWord && !isLoading && searchResultFound && (
        <div className="my-6 mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {searchResult?.map((video) => {
            return (
              <img
                className="h-54 hover:scale-110 transition duration-150 ease-out w-80 rounded-lg"
                src={`https://image.tmdb.org/t/p/w300${video.backdropPath}`}
                key={video.id}
                alt={`${video.name} image`}
              />
            );
          })}
        </div>
      )}
      {/* search result not found */}
      {searchKeyWord && !isLoading && !searchResultFound && (
        <div>{`sorry, can't find match for ${searchKeyWord}`}</div>
      )}

      {/* loading spinner */}
      {searchKeyWord && isLoading && <SearchLoadingSpinner />}
    </div>
  );
}

export default SearchModal;
