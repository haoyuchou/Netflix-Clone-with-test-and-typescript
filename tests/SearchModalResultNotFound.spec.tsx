import "@testing-library/jest-dom";
import React from "react";
import SearchModel, { Props } from "../components/Modal/SearchModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CardData } from "../typings/card.types";
import { configure } from "@testing-library/dom";

const defaultProps: Props = {
  onClose: jest.fn(),
};

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
