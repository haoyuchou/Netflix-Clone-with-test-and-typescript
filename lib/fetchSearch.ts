import { CardData } from "../typings/card.types";

export const fetchSearch = async (keyword: string) => {
  let query = "";
  const keywordArray = keyword.split(" ");
  // [ 'the', 'avengers' ]
  // query=the%20avenger%20
  keywordArray.forEach((item) => {
    query = query + item + "%20";
  });
  //console.log(query);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSearch?keyword=${query}`
  );
  const result: CardData[] = await res.json();
  //console.log("result: ",result);
  return result;
};
