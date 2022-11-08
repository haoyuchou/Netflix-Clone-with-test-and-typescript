export const fetchYoutube = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getYoutube?id=${id}`
  );
  const youtubeKey = await res.json();
  console.log("res: ", youtubeKey);
  return youtubeKey;
};
