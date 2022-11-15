import "@testing-library/jest-dom";
import React from "react";
import VideoModalContent, {
  Props,
} from "../components/Modal/VideoModalContent";
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
//import fetchYoutube from "../lib/fetchYoutube";

jest.mock("next-auth/react");

const defaultProps: Props = {
  backdropPath: "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
  posterPath: "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
  name: "House of the Dragon",
  rate: 8.7,
  overview:
    "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
  id: 94997,
  mediaType: "tv",
};

const unmockedFetch = global.fetch;

afterEach(() => {
  global.fetch = unmockedFetch;
});

describe("", () => {
  test("show correct videoModalContent", () => {
    render(<VideoModalContent {...defaultProps} />);
    // modal top background image is render correctly
    expect(screen.getByTestId("video-modal-content")).toHaveStyle(
      `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${defaultProps.backdropPath})`
    );
    // title
    expect(screen.getByText(defaultProps.name));
    //screen.debug();

    // get rate
    expect(screen.getByText(defaultProps.rate, { selector: "h1" }));
    // my list and continue watch render correctly
    expect(screen.getByText("My List", { selector: "h1" }));
    expect(screen.getByText("Continue Watch", { selector: "h1" }));
    // overview render correcly
    expect(screen.getByText(defaultProps.overview, { selector: "p" }));
    // video play icon render correctly
    expect(screen.getByTitle("playIcon"));
  });

  test("click correct show video, click correct make video disapper", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ youtubeKey: "PLl99DlL6b4" }),
      })
    ) as jest.Mock;

    //for video player portal
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "video-root");
    document.body.appendChild(portalRoot);

    render(<VideoModalContent {...defaultProps} />);

    const playIcon = await screen.findByTitle("playIcon");
    // click icon, the video modal show
    fireEvent.click(playIcon);
    await waitFor(() => {
      expect(screen.getByTestId("leave-icon"));
    });

    // click leave-icon, the video modal is gone
    fireEvent.click(screen.getByTestId("leave-icon"));
    await waitFor(() => {
      const leaveIcon = screen.queryByTestId("leave-icon");
      expect(leaveIcon).not.toBeInTheDocument();
    });
  });

  test("alert when don't have video link", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ youtubeKey: "sorry, we don't have this video" }),
      })
    ) as jest.Mock;

    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "video-root");
    document.body.appendChild(portalRoot);

    render(<VideoModalContent {...defaultProps} />);

    const playIcon = await screen.findByTitle("playIcon");
    // click icon, the video modal show
    fireEvent.click(playIcon);

    waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    });
  });
});

