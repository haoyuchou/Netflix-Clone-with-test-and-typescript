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
  switch (fetchContent) {
    case "fetchTrending":
      response = await fetch(requests.fetchTrending);
      break;
    case "fetchNetflixOriginal":
      response = await fetch(requests.fetchNetflixOriginal);
      break;
    case "fetchUpcomingMovie":
      response = await fetch(requests.fetchUpcomingMovie);
      break;
    case "fetchPopularMovie":
      response = await fetch(requests.fetchPopularMovie);
      break;
    case "fetchTopRatedMovie":
      response = await fetch(requests.fetchTopRatedMovie);
      break;
    case "fetchPopularTV":
      response = await fetch(requests.fetchPopularTV);
      break;
    case "fetchTopRatedTV":
      response = await fetch(requests.fetchTopRatedTV);
      break;
    case "fetchActionMovie":
      response = await fetch(requests.fetchActionMovie);
      break;
    case "fetchAnimationMovie":
      response = await fetch(requests.fetchAnimationMovie);
      break;
    case "fetchDramaMovie":
      response = await fetch(requests.fetchDramaMovie);
      break;
    case "fetchRomanceMovie":
      response = await fetch(requests.fetchRomanceMovie);
      break;
    case "fetchActionTV":
      response = await fetch(requests.fetchActionTV);
      break;
    case "fetchAnimationTV":
      response = await fetch(requests.fetchAnimationTV);
      break;
    case "fetchDramaTV":
      response = await fetch(requests.fetchDramaTV);
      break;
    case "fetchDocumentaryTV":
      response = await fetch(requests.fetchDocumentaryTV);
      break;
    default:
      response = await fetch(requests.fetchTrending);
  }

  const data = await response.json();
  //console.log(typeof(data.results[0]));
  const trending: CardData[] = data.results.map((video: any) => {
    return {
      name: video.title || video.name || "sorry, theres is no name",
      rate: video.vote_average || "sorry, there is no rate",
      mediaType: video.media_type || "sorry, there is no type",
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
