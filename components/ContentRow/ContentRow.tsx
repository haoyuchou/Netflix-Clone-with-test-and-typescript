import React, { useState, useEffect } from "react";
import { CardData } from "../../typings/card.types";
import Modal from "../Modal/Modal";
import VideoModalContent from "../Modal/VideoModalContent";

export interface Props {
  content: CardData[];
  title: string;
}

function ContentRow({ content, title }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInto] = useState<CardData>({
    name: "sorry we don't have the name",
    rate: 0,
    mediaType: "sorry, we don't have the media type",
    backdropPath: "sorry, we don't have the backdrop picture",
    posterPath: "sorry we don't have the poster",
    id: 0,
    overview: "sorry, no overview",
  });

  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <div className="mb-4">
      <h1 className="text-white font-semibold text-3xl pb-4">{title}</h1>
      <div className="flex overflow-x-scroll overflow-y-hidden space-x-5 ">
        {content.map((video) => {
          if (
            video.backdropPath === "sorry, there is no Backdrop" ||
            video.posterPath === "sorry, there is no Poster"
          ) {
            return;
          } else {
            return (
              <img
                onClick={() => {
                  setShowModal(true);
                  setModalInto({
                    name: video.name,
                    rate: video.rate,
                    mediaType: video.mediaType,
                    backdropPath: video.backdropPath,
                    posterPath: video.posterPath,
                    id: video.id,
                    overview: video.overview,
                  });
                }}
                className="h-54 hover:scale-110 transition duration-150 ease-out"
                src={`https://image.tmdb.org/t/p/w185${video.posterPath}`}
                key={video.id}
                alt={`${video.name} image`}
              />
            );
          }
        })}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <VideoModalContent
              name={modalInfo.name}
              rate={modalInfo.rate}
              mediaType={modalInfo.mediaType}
              backdropPath={modalInfo.backdropPath}
              posterPath={modalInfo.posterPath}
              id={modalInfo.id}
              overview={modalInfo.overview}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ContentRow;
