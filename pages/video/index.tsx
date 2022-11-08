import React from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function index() {
  const router = useRouter();
  const { youtubeKey } = router.query;

  return (
    <div className="h-screen">
      <ReactPlayer width="100%" height="100%" url={`https://www.youtube.com/watch?v=${youtubeKey}&origin=http://localhost:3000`}/>
    </div>
  );
}

export default index;
