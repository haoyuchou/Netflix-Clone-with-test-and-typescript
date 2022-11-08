import React from "react";
import { CardData } from "../../typings/card.types";
import { PlayCircleIcon, StarIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/solid";


function VideoModalContent({ backdropPath, name, rate, overview }: CardData) {
  return (
    <div className="">
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)) ,url(https://image.tmdb.org/t/p/original${backdropPath})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          objectFit: "contain",
        }}
        className="h-[200px] md:h-[400px] relative"
      >
        <h1 className="text-white font-bold text-xl md:text-3xl absolute bottom-6 left-12">
          {name}
        </h1>

        <PlayCircleIcon className="absolute left-[45%] top-[37%] h-12 w-[10%] text-white opacity-40 cursor-pointer" />
      </div>
      <div className="px-12 pt-6">
        <div className="text-white flex space-x-1 items-center mb-6">
          <h1 className="text-xl">{rate}</h1>
          <StarIcon className="h-6 w-6" />
        </div>
        <div className="flex space-x-3 text-white mb-6">
          {/* my list */}
          <div>
            <PlusIcon className="h-12 mx-auto"/>
            <h1 className="text-lg md:text-xl text-center">My List</h1>
          </div>
          {/* continue watch */}
          <div>
            <CheckIcon className="h-12 mx-auto"/>
            <h1 className="text-lg md:text-xl text-center">Continue Watch</h1>
          </div>
        </div>
        <p className="text-white text-lg sm:text-xl font-semibold">{overview}</p>
      </div>
    </div>
  );
}

export default VideoModalContent;
