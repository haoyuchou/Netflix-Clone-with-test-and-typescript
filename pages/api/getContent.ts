// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import requests from "../../request/requests";
import { CardData } from "../../typings/card.types";

type Data = CardData[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { fetchContent } = req.query;
  let response;
  let videoType: string;
  switch (fetchContent) {
    case "fetchTrending":
      response = await fetch(requests.fetchTrending);
      break;
    case "fetchNetflixOriginal":
      response = await fetch(requests.fetchNetflixOriginal);
      break;
    case "fetchUpcomingMovie":
      response = await fetch(requests.fetchUpcomingMovie);
      videoType = "Movie";
      break;
    case "fetchPopularMovie":
      response = await fetch(requests.fetchPopularMovie);
      videoType = "Movie";
      break;
    case "fetchTopRatedMovie":
      response = await fetch(requests.fetchTopRatedMovie);
      videoType = "Movie";
      break;
    case "fetchPopularTV":
      response = await fetch(requests.fetchPopularTV);
      videoType = "TV";
      break;
    case "fetchTopRatedTV":
      response = await fetch(requests.fetchTopRatedTV);
      videoType = "TV";
      break;
    case "fetchActionMovie":
      response = await fetch(requests.fetchActionMovie);
      videoType = "Movie";
      break;
    case "fetchAnimationMovie":
      response = await fetch(requests.fetchAnimationMovie);
      videoType = "Movie";
      break;
    case "fetchDramaMovie":
      response = await fetch(requests.fetchDramaMovie);
      videoType = "Movie";
      break;
    case "fetchRomanceMovie":
      response = await fetch(requests.fetchRomanceMovie);
      videoType = "Movie";
      break;
    case "fetchActionTV":
      response = await fetch(requests.fetchActionTV);
      videoType = "TV";
      break;
    case "fetchAnimationTV":
      response = await fetch(requests.fetchAnimationTV);
      videoType = "TV";
      break;
    case "fetchDramaTV":
      response = await fetch(requests.fetchDramaTV);
      videoType = "TV";
      break;
    case "fetchDocumentaryTV":
      response = await fetch(requests.fetchDocumentaryTV);
      videoType = "TV";
      break;
    default:
      response = await fetch(requests.fetchTrending);
  }

  const data = await response.json();
  if (fetchContent === "fetchTopRatedMovie") {
    console.log(data.results);
  }
  //console.log(typeof(data.results[0]));
  const trending: CardData[] = data.results.map((video: any) => {
    return {
      name: video.title || video.name || "sorry, theres is no name",
      rate: video.vote_average || "sorry, there is no rate",
      mediaType: videoType || video.media_type || "sorry, there is no type",
      backdropPath: video.backdrop_path || "sorry, there is no Backdrop",
      posterPath: video.poster_path || "sorry, there is no Poster",
      myList: false,
      continueWatch: false,
      id: video.id, // !!!!!!!!
      overview: video.overview || "sorry, there is no overview",
    };
  });
  res.status(200).json(trending);
}
