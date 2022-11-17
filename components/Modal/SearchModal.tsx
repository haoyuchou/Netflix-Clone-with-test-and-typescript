import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import useDebounce from "../../hooks/useDebounce";
import { fetchSearch } from "../../lib/fetchSearch";
import { CardData } from "../../typings/card.types";
import { TailSpin } from "react-loader-spinner";

export interface Props {
  onClose: () => void;
}

function SearchModal({ onClose }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<CardData[]>();
  const [isLoading, setIsLoading] = useState(false);
  const searchKeyWord = useDebounce(searchValue, 800);

  useEffect(() => {
    setIsLoading((prev) => true);
    console.log("key word: ", searchKeyWord);
    const fetchMovieTV = async () => {
      const movieData = await fetchSearch(searchKeyWord, "movie");
      const tvData = await fetchSearch(searchKeyWord, "tv");
      console.log("final movie data: ", movieData);
      console.log("final tv data: ", tvData);

      setIsLoading(false);
      if (
        movieData[0].name === "sorry, there is no movie match found" &&
        tvData[0].name === "sorry, there is no tv match found"
      ) {
        // not any result found
        setSearchResult(movieData);
        return;
      } else if (movieData[0].name === "sorry, there is no movie match found") {
        setSearchResult((prev) =>
          tvData.filter(
            (video) => video.backdropPath !== "sorry, there is no Backdrop"
          )
        );
      } else if (tvData[0].name === "sorry, there is no tv match found") {
        setSearchResult((prev) =>
          movieData.filter(
            (video) => video.backdropPath !== "sorry, there is no Backdrop"
          )
        );
      } else {
        const movie = movieData.filter(
          (video) => video.backdropPath !== "sorry, there is no Backdrop"
        );
        const tv = tvData.filter(
          (video) => video.backdropPath !== "sorry, there is no Backdrop"
        );
        const movieTvData = movie.concat(tv);
        //console.log(movieTvData, "abcde")
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

      {/* search result */}
      {searchKeyWord && isLoading === false && (
        <div className="my-6 mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {searchResult?.map((video) => {
            // console.log("Video backdrop: ", video.backdropPath);
            if (video.name === "sorry, there is no movie match found") {
              return;
            } else {
              return (
                <img
                  className="h-54 hover:scale-110 transition duration-150 ease-out w-80 rounded-lg"
                  src={`https://image.tmdb.org/t/p/w300${video.backdropPath}`}
                  key={video.id}
                  alt={`${video.name} image`}
                />
              );
            }
          })}
        </div>
      )}

      {/* loading spinner */}
      {searchKeyWord && isLoading && (
        <div className="mt-48 flex justify-center">
          <div className="">
            <TailSpin
              color="#E50914"
              width="50"
              height="50"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchModal;
