import "@testing-library/jest-dom";
import React from "react";

import Menu, { Props } from "../components/Hamburger Menu/Menu/Menu";
import { render, screen, fireEvent } from "@testing-library/react";

const menuProp: Props = {
  open: true,
  onClick: () => {},
};

test("correct switch page when menu clicked", () => {
  render(<Menu {...menuProp} />);

  expect(screen.getByText("Home", { selector: "a" })).toHaveAttribute(
    "href",
    "/"
  );
  expect(screen.getByText("Movie", { selector: "a" })).toHaveAttribute(
    "href",
    "/movie"
  );
  expect(screen.getByText("TV", { selector: "a" })).toHaveAttribute(
    "href",
    "/tv"
  );
});
