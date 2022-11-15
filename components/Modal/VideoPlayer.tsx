import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { TailSpin } from "react-loader-spinner";
import ReactDOM from "react-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export interface Props {
  youtubeKey: string;
  onClose: () => void;
}

function VideoPlayer({ youtubeKey, onClose }: Props) {
  const [hasWindow, setHasWindow] = useState(false);
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (hasWindow) {
    return ReactDOM.createPortal(
      <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-black">
        <div className="z-60 h-screen relative">
          <div
            data-testid="leave-icon-wrapper"
            onMouseEnter={() => setIsHover((prev) => true)}
            onMouseLeave={() => setIsHover((prev) => false)}
            onClick={onClose}
            className="absolute h-12 w-12 top-4 left-4"
          >
            <ArrowLeftIcon
              data-testid="leave-icon"
              className={`h-10 ${isHover ? "text-white" : "text-transparent"}`}
            />
          </div>
          <ReactPlayer
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${youtubeKey}`}
          />{" "}
        </div>
      </div>,
      document.getElementById("video-root") as HTMLElement
    );
  } else {
    return (
      <div className="h-screen w-screen bg-black z-50 pt-[25%]">
        {/* Center the loading wrapper */}

        <TailSpin
          color="#E50914"
          width="100%"
          height="80"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
}

export default VideoPlayer;
