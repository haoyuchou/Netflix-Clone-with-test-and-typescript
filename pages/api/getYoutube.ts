// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  console.log(id);
  let youtubeKey;
  // assume it is tv
  const ans = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.API_KEY}`
  )
    .then((response) => {
      if (response.ok) {
        console.log("successful response")
        return response.json();
      }
      throw new Error("sorry, we don't have this video");
    })
    .then((response) => {
      console.log(response);
      youtubeKey = response.results[0].key;
      console.log("youtube key: ", youtubeKey);
    })
    .catch((error) => {
      console.log(error);
      youtubeKey = "sorry, we don't have this video";
    });

    // assume it is movie
    if (youtubeKey === "sorry, we don't have this video"){
        const ans = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}`
          )
            .then((response) => {
              if (response.ok) {
                console.log("successful response")
                return response.json();
              }
              throw new Error("sorry, we don't have this video");
            })
            .then((response) => {
              console.log(response);
              youtubeKey = response.results[0].key;
              console.log("youtube key: ", youtubeKey);
            })
            .catch((error) => {
              console.log(error);
              youtubeKey = "sorry, we don't have this video";
            });
    }

  

  res.status(200).json({youtubeKey});
}
