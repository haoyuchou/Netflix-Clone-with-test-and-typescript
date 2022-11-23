import "@testing-library/jest-dom";
import React from "react";
import SearchModel, { Props } from "../components/Modal/SearchModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CardData } from "../typings/card.types";

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

const unmockedFetch = global.fetch;

beforeEach(() => {});

afterEach(() => {
  global.fetch = unmockedFetch;
});

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
    const setSearch = jest.fn((value) => {});
    render(<SearchModel {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(
      "Start your search"
    ) as HTMLElement;

    fireEvent.change(searchInput, { target: { value: "kingsman" } });

    // await loading spinner
    await waitFor(() => {
      expect(screen.getByTestId("loading-spinner-wrapper"));
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
      expect(
        screen.queryByTestId("loading-spinner-wrapper")
      ).not.toBeInTheDocument();
    });
  });
  test("show loading spinner first, then match not found", () => {});
});
