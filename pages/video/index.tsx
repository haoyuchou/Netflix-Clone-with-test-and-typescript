/*import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { TailSpin } from "react-loader-spinner";

function index() {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  const router = useRouter();
  const { youtubeKey } = router.query;

  // origin=http://localhost:3000

  if (hasWindow) {
    return (
      <div className="h-screen">
        <ReactPlayer
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${youtubeKey}`}
        />
      </div>
    );
  } else {
    return (
      <div className="h-screen pt-[25%]">

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

export default index;*/
import React from 'react'

function index() {
  return (
    <div>index</div>
  )
}

export default index