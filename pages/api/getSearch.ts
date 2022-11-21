// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CardData } from "../../typings/card.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { keyword } = req.query;
  let movieResult: CardData[];
  let tvResult: CardData[];
  let totalResult: CardData[];
  //console.log(keyword);
  Promise.all([
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${keyword}&page=1`
    ).then((value) => value.json()),
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&language=en-US&query=${keyword}&page=1`
    ).then((value) => value.json()),
  ])
    .then(([movieRes, tvRes]) => {
      if (movieRes.results.length === 0 && tvRes.results.length === 0) {
        totalResult = [
          {
            name: "sorry, there is no match found",
            rate: 0,
            mediaType: "nah",
            backdropPath: "",
            posterPath: "",
            overview: "",
            id: 0,
          },
        ];
        res.status(200).json(totalResult);
      } else {
        movieResult = movieRes.results.map((video: any) => {
          return {
            name:
              video.title ||
              video.name ||
              video.original_title ||
              video.original_name ||
              "sorry, theres is no name",
            rate: video.vote_average || "sorry, there is no rate",
            mediaType: "movie",
            backdropPath: video.backdrop_path || "sorry, there is no Backdrop",
            posterPath: video.poster_path || "sorry, there is no Poster",
            myList: false,
            continueWatch: false,
            id: video.id,
            overview: video.overview || "sorry, there is no overview",
          };
        });

        tvResult = tvRes.results.map((video: any) => {
          return {
            name:
              video.title ||
              video.name ||
              video.original_title ||
              video.original_name ||
              "sorry, theres is no name",
            rate: video.vote_average || "sorry, there is no rate",
            mediaType: "tv",
            backdropPath: video.backdrop_path || "sorry, there is no Backdrop",
            posterPath: video.poster_path || "sorry, there is no Poster",
            myList: false,
            continueWatch: false,
            id: video.id,
            overview: video.overview || "sorry, there is no overview",
          };
        });

        totalResult = movieResult.concat(tvResult);
        totalResult = totalResult.filter(
          (video) => video.backdropPath !== "sorry, there is no Backdrop"
        );
        res.status(200).json(totalResult);
      }
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
      res.status(405).end();
    });
  /*try {
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
  }*/
}
