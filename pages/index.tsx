import type { GetServerSideProps, NextPage } from "next";
import { CardData } from "../typings/card.types";
import { fetchContent } from "../lib/fetchContent";
import TopBanner from "../components/TopBanner/TopBanner";
import { Fragment, useEffect, useState } from "react";
import ContentRow from "../components/ContentRow/ContentRow";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export interface Props {
  trending: CardData[];
  netflixOriginal: CardData[];
  upcomingMovie: CardData[];
  popularMovie: CardData[];
  topRatedMovie: CardData[];
  popularTV: CardData[];
  topRatedTV: CardData[];
}

const Home = ({
  trending,
  netflixOriginal,
  upcomingMovie,
  popularMovie,
  topRatedMovie,
  popularTV,
  topRatedTV,
}: Props) => {
  //console.log("trending: ", trending);
  const { data: session } = useSession();
  //console.log("home page session: ", session);
  // if no session, push back to login page
  //const router = useRouter();

  const [backgroundImage, setBackgroundImage] = useState<CardData>();
  useEffect(() => {
    const trendLen = trending.length;
    const randomTrendNum = Math.floor(Math.random() * trendLen);
    setBackgroundImage(trending[randomTrendNum]);
  }, []);

  return (
    <Fragment>
      <div className="">
        <TopBanner background={backgroundImage || trending[0]} />
        <div className="px-6 pb-6">
          <ContentRow title="Trending" content={trending} />
          <ContentRow title="Netflix Original" content={netflixOriginal} />
          <ContentRow title="Upcoming Movie" content={upcomingMovie} />
          <ContentRow title="Popular Movie" content={popularMovie} />
          <ContentRow title="Top Rated Movie" content={topRatedMovie} />
          <ContentRow title="Popular TV" content={popularTV} />
          <ContentRow title="Top Rated TV" content={topRatedTV} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  /*const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }*/
  const trending = await fetchContent("fetchTrending");
  const netflixOriginal = await fetchContent("fetchNetflixOriginal");
  const upcomingMovie = await fetchContent("fetchUpcomingMovie");
  const popularMovie = await fetchContent("fetchPopularMovie");
  const topRatedMovie = await fetchContent("fetchTopRatedMovie");
  const popularTV = await fetchContent("fetchPopularTV");
  const topRatedTV = await fetchContent("fetchTopRatedTV");
  //console.log("popular movie: ", popularMovie);
  return {
    props: {
      trending,
      netflixOriginal,
      upcomingMovie,
      popularMovie,
      topRatedMovie,
      popularTV,
      topRatedTV,
    },
  };
};
