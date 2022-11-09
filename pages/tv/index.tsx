import React from "react";
import type { GetServerSideProps } from "next";
import Header from "../../components/TopBanner/Header";
import ContentRow from "../../components/ContentRow/ContentRow";
import { fetchContent } from "../../lib/fetchContent";
import { CardData } from "../../typings/card.types";

interface Props {
  netflixOriginal: CardData[];
  popularTV: CardData[];
  topRatedTV: CardData[];
  actionTV: CardData[];
  animationTV: CardData[];
  dramaTV: CardData[];
  documentaryTV: CardData[];
}

function index({
  netflixOriginal,
  popularTV,
  topRatedTV,
  actionTV,
  animationTV,
  dramaTV,
  documentaryTV,
}: Props) {
  return (
    <div>
      <Header title="TV Series" />
      <div className="px-6 pt-52 pb-6">
        <ContentRow title="Netflix Original" content={netflixOriginal} />
        <ContentRow title="Popular TV" content={popularTV} />
        <ContentRow title="Top Rated TV" content={topRatedTV} />
        <ContentRow title="Action TV" content={actionTV} />
        <ContentRow title="Animation TV" content={animationTV} />
        <ContentRow title="Drama TV" content={dramaTV} />
        <ContentRow title="Documentary TV" content={documentaryTV} />
      </div>
    </div>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const netflixOriginal = await fetchContent("fetchNetflixOriginal");
  const popularTV = await fetchContent("fetchPopularTV");
  const topRatedTV = await fetchContent("fetchTopRatedTV");
  const actionTV = await fetchContent("fetchActionTV");
  const animationTV = await fetchContent("fetchAnimationTV");
  const dramaTV = await fetchContent("fetchDramaTV");
  const documentaryTV = await fetchContent("fetchDocumentaryTV");

  return {
    props: {
      netflixOriginal,
      popularTV,
      topRatedTV,
      actionTV,
      animationTV,
      dramaTV,
      documentaryTV,
    },
  };
};
