import React from "react";
export interface Props {
  backdropPath: string;
}

function VideoModalContent({ backdropPath }: Props) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)) ,url(${backdropPath})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          objectFit: "contain",
        }}
        className="h-[200px] md:h-[400px]"
      />
    </div>
  );
}

export default VideoModalContent;
