import React from "react";
import type { GetServerSideProps } from "next";
import Header from "../../components/TopBanner/Header";
import ContentRow from "../../components/ContentRow/ContentRow";
import { CardData } from "../../typings/card.types";
import { fetchContent } from "../../lib/fetchContent";

interface Props {
  upcomingMovie: CardData[];
  popularMovie: CardData[];
  topRatedMovie: CardData[];
  actionMovie: CardData[];
  animationMovie: CardData[];
  dramaMovie: CardData[];
  romanceMovie: CardData[];
}

function index({
  upcomingMovie,
  popularMovie,
  topRatedMovie,
  actionMovie,
  animationMovie,
  dramaMovie,
  romanceMovie,
}: Props) {
  return (
    <div>
      <Header title="Movie" />
      <div className="px-6 pt-52 pb-6">
        <ContentRow title="Upcoming Movie" content={upcomingMovie} />
        <ContentRow title="Popular Movie" content={popularMovie} />
        <ContentRow title="Top Rated Movie" content={topRatedMovie} />
        <ContentRow title="Action Movie" content={actionMovie} />
        <ContentRow title="Animation Movie" content={animationMovie} />
        <ContentRow title="Drama Movie" content={dramaMovie} />
        <ContentRow title="Romance Movie" content={romanceMovie} />
      </div>
    </div>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const upcomingMovie = await fetchContent("fetchUpcomingMovie");
  const popularMovie = await fetchContent("fetchPopularMovie");
  const topRatedMovie = await fetchContent("fetchTopRatedMovie");
  const actionMovie = await fetchContent("fetchActionMovie");
  const animationMovie = await fetchContent("fetchAnimationMovie");
  const dramaMovie = await fetchContent("fetchDramaMovie");
  const romanceMovie = await fetchContent("fetchRomanceMovie");

  return {
    props: {
      upcomingMovie,
      popularMovie,
      topRatedMovie,
      actionMovie,
      animationMovie,
      dramaMovie,
      romanceMovie,
    },
  };
};
