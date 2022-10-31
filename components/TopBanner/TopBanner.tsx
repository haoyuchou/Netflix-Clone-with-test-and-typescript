import React from "react";
import { CardData } from "../../typings/card.types";
import Header from "./Header";

interface Props {
  background: CardData;
}

function TopBanner(props: Props) {
  const { background } = props;
  //console.log("background: ", background.backdropPath);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${background.backdropPath})`,
      }}
      className="h-[600px] bg-cover bg-center object-contain"
    >
      <Header title="Home" />
      <div className="max-w-[400px] pt-[125px] pl-[30px] text-left">
        <p className="text-white font-bold text-3xl">{background.name}</p>

        <div className="flex pt-[50px] space-x-3">
          <button className="bg-gray-800 border-b text-white px-5 py-1 cursor-pointer rounded-full shadow-lg ">
            Play
          </button>
          <button className="bg-gray-800 border-b text-white px-5 py-1 cursor-pointer rounded-full shadow-lg ">
            Add to list
          </button>
        </div>

        <div className="pt-[30px]">
          <p className="text-white text-xs md:text-base font-semibold">
            {background.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
