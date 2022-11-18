// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CardData } from "../../typings/card.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { keyword, video_type } = req.query;

  //console.log(keyword);

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${video_type}?api_key=${process.env.API_KEY}&language=en-US&query=${keyword}&page=1`
    );
    const data = await response.json();
    let movieResult: CardData[];
    if (data.results.length === 0) {
      console.log("no result found")
      movieResult = [
        {
          name: `sorry, there is no match found`,
          rate: 0,
          mediaType: video_type as string,
          backdropPath: "",
          posterPath: "",
          overview: "",
          id: 0,
        },
      ];
    } else {
      movieResult = data.results.map((video: any) => {
        return {
          name:
            video.title ||
            video.name ||
            video.original_title ||
            video.original_name ||
            "sorry, theres is no name",
          rate: video.vote_average || "sorry, there is no rate",
          mediaType: video_type,
          backdropPath: video.backdrop_path || "sorry, there is no Backdrop",
          posterPath: video.poster_path || "sorry, there is no Poster",
          myList: false,
          continueWatch: false,
          id: video.id,
          overview: video.overview || "sorry, there is no overview",
        };
      });
    }

    movieResult = movieResult.filter(
      (video) =>
        video.backdropPath !== "sorry, there is no Backdrop" ||
        video.name === "sorry, there is no match found"
    );

    console.log(movieResult);
    res.status(200).json(movieResult);
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
