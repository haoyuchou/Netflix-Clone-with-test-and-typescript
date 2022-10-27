import { CardData } from "../typings/card.types";

export const fetchContent = async (fetchContent: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getContent?fetchContent=${fetchContent}`);

  const trend: CardData[] = await res.json();
  return trend;
};
