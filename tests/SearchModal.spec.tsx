import "@testing-library/jest-dom";
import React from "react";
import SearchModel, { Props } from "../components/Modal/SearchModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CardData } from "../typings/card.types";
import { configure } from "@testing-library/dom";

const defaultProps: Props = {
  onClose: jest.fn(),
};

const mockSearchResult: CardData[] = [
  {
    backdropPath: "/1ZIeGwD2lMlLMr4u6IIR302jqhD.jpg",
    continueWatch: false,
    id: 207703,
    mediaType: "movie",
    myList: false,
    name: "Kingsman: The Secret Service",
    overview:
      "The story of a super-secret spy organization that recruits an unrefined but promising street kid into the agency's ultra-competitive training program just as a global threat emerges from a twisted tech genius.",
    posterPath: "/ay7xwXn1G9fzX9TUBlkGA584rGi.jpg",
    rate: 7.6,
  },
  {
    backdropPath: "/eVHVwP71el20fofkCHo78ebQv7Q.jpg",
    continueWatch: false,
    id: 343668,
    mediaType: "movie",
    myList: false,
    name: "Kingsman: The Golden Circle",
    overview:
      "When an attack on the Kingsman headquarters takes place and a new villain rises, Eggsy and Merlin are forced to work together with the American agency known as the Statesman to save the world.",
    posterPath: "/34xBL6BXNYFqtHO9zhcgoakS4aP.jpg",
    rate: 7,
  },
  {
    backdropPath: "/4OTYefcAlaShn6TGVK33UxLW9R7.jpg",
    continueWatch: false,
    id: 476669,
    mediaType: "movie",
    myList: false,
    name: "The King's Man",
    overview:
      "As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
    posterPath: "/nj5HmHRZsrYQEYYXyAusFv35erP.jpg",
    rate: 6.8,
  },
];

const mockSearchResultNotFound: CardData[] = [
  {
    name: "sorry, there is no match found",
    rate: 0,
    mediaType: "nah",
    backdropPath: "",
    posterPath: "",
    overview: "",
    id: 0,
  },
];

const unmockedFetch = global.fetch;

beforeEach(() => {});

afterEach(() => {
  global.fetch = unmockedFetch;
});

//configure({ asyncUtilTimeout: 5000 });

describe("", () => {
  test("show search icon, place holder, leave icon correct", () => {
    render(<SearchModel {...defaultProps} />);
    // leave icon
    expect(screen.getByTitle("arrowLeftIcon"));
    // magnify icon
    expect(screen.getByTitle("MagnifyingGlassIcon"));
    // expect input
    expect(screen.getByPlaceholderText("Start your search"));
  });

  test("show loading spinner first, then result if find match", async () => {
    //const setSearch = jest.fn((value) => {});
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(portalRoot);
    render(<SearchModel {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(
      "Start your search"
    ) as HTMLElement;

    fireEvent.change(searchInput, { target: { value: "kingsman" } });

    // await loading spinner
    await waitFor(() => {
      expect(screen.getByTestId("tail-spin-loading"));
      //screen.debug();
    });

    // await fetch, then loading spinner disappear
    await waitFor(() => {
      // fetch kingsman
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockSearchResult),
        })
      ) as jest.Mock;
    });
    await waitFor(() => {
      // loading spinner disappear
      expect(screen.queryByTestId("tail-spin-loading")).not.toBeInTheDocument();
    });
    const image = await waitFor(() => {
      // results backrop show
      return screen.getByAltText(
        `${mockSearchResult[0].name} image`
      ) as HTMLImageElement;
    });
    // click results, the modal show
    fireEvent.click(image);
    expect(screen.getByText(mockSearchResult[0].name));
  });

  test("show loading spinner first, then match not found", async () => {
    render(<SearchModel {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(
      "Start your search"
    ) as HTMLElement;

    fireEvent.change(searchInput, { target: { value: "randomname" } });

    // await loading spinner
    await waitFor(() => {
      expect(screen.getByTestId("tail-spin-loading"));
      //screen.debug();
    });

    // await fetch, then loading spinner disappear
    await waitFor(() => {
      // fetch movie and tv
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockSearchResultNotFound),
        })
      ) as jest.Mock;
    });

    await waitFor(() => {
      // loading spinner disappear
      expect(screen.queryByTestId("tail-spin-loading")).not.toBeInTheDocument();
    });

    const resultNotFoundText = await waitFor(() =>
      screen.getByText("sorry, can't find match for randomname", {
        selector: "h1",
      })
    );
  });
});
