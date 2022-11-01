import React from "react";
import { CardData } from "../../typings/card.types";

export interface Props {
  content: CardData[];
  title: string
}

function ContentRow({ content, title }: Props) {
  return (
    <div className="mb-4">
      <h1 className="text-white font-semibold text-3xl pb-4">{title}</h1>
      <div className="flex overflow-x-scroll overflow-y-hidden space-x-5 ">
        {content.map((video) => {
          //console.log("Video: ",video)
          return (
            <img className="h-54 hover:scale-110 transition duration-150 ease-out" src={`https://image.tmdb.org/t/p/w185${video.posterPath}`} key={video.id} alt={`${video.name} image`} />
          );
        })}
      </div>
    </div>
  );
}

export default ContentRow;
