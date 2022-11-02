import "@testing-library/jest-dom";
import React from "react";
import TopBanner, { Props } from "../components/TopBanner/TopBanner";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
jest.mock("next-auth/react");

const defaultProps: Props = {
  background: {
    name: "House of the Dragon",
    rate: 8.517,
    mediaType: "tv",
    backdropPath: "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
    posterPath: "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    myList: false,
    continueWatch: false,
    id: 94997,
    overview:
      "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
  },
};

test("show correct top banner", async () => {
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
  render(<TopBanner {...defaultProps} />);
  // title is in the banner
  expect(screen.getByText(defaultProps.background.name)).toBeInTheDocument();
  // button is in the banner
  expect(screen.getByText("Play", { selector: "button" }));
  expect(screen.getByText("Add to list", { selector: "button" }));
  // overview is shown in the banner
  expect(
    screen.getByText(defaultProps.background.overview)
  ).toBeInTheDocument();
});
