import "@testing-library/jest-dom";
import React from "react";
import ContentRow, { Props } from "../components/ContentRow/ContentRow";
import { render, screen } from "@testing-library/react";

const defaultProps: Props = {
  content: [
    {
      name: "The Godfather",
      rate: 8.7,
      mediaType: "Movie",
      backdropPath: "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
      posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      myList: false,
      continueWatch: false,
      id: 238,
      overview:
        "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    },
    {
      name: "The Shawshank Redemption",
      rate: 8.7,
      mediaType: "Movie",
      backdropPath: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
      posterPath: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
      myList: false,
      continueWatch: false,
      id: 278,
      overview:
        "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    },
  ],
  title: "Top Rated Movie",
};

test("show correct genre title and poster", () => {
  render(<ContentRow {...defaultProps} />);
  const image = screen.getByAltText("The Godfather image") as HTMLImageElement;
  // Check genre title
  expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  // check image is there
  expect(image.src).toEqual(`https://image.tmdb.org/t/p/w185${defaultProps.content[0].posterPath}`)
  expect(screen.getByAltText("The Godfather image")).toBeInTheDocument();
});
