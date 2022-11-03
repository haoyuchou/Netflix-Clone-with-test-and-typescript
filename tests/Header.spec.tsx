import "@testing-library/jest-dom";
import React from "react";
import Header, { Props } from "../components/TopBanner/Header";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
jest.mock("next-auth/react");
const homePageHeaderProps: Props = {
  title: "Home",
};
const nonHomePageHeaderProps: Props = {
  title: "Movie",
};

test("show correct header at home page", () => {
  // mock session
  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        name: "Thomas",
        email: "t123@gmail.com",
        image:
          "https://m.media-amazon.com/images/M/MV5BZjYzZDgzMmYtYjY5Zi00YTk1LThhMDYtNjFlNzM4MTZhYzgyXkEyXkFqcGdeQXVyMTE5NDQ1MzQ3._V1_.jpg",
      },
      expires: "2022-12-02T09:25:12.100Z",
    },
  });

  render(<Header {...homePageHeaderProps} />);
  const netflixLogo = screen.getByAltText("Netflix") as HTMLImageElement;
  // sign out button
  expect(screen.getByText("Sign Out", { selector: "button" }));
  // netflix logo shown in home page
  expect(netflixLogo.src).toEqual(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
  );
  // hamburger button is there
  expect(screen.getByTitle("Bars3Icon")).toBeInTheDocument();
});