import "@testing-library/jest-dom";
import React from "react";
import VideoPlayer, { Props } from "../components/Modal/VideoPlayer";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

//jest.mock('react-player/lazy', () => {
//  return jest.requireActual('react-player');
//});

const defaultProps: Props = {
  youtubeKey: "PLl99DlL6b4",
  onClose: jest.fn(),
};

test("videoPlayer render correctly", async() => {
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "video-root");
  document.body.appendChild(portalRoot);

  render(<VideoPlayer {...defaultProps} />);


  expect(screen.getByTestId("leave-icon")).toHaveClass("text-transparent");

  // when mouse enter the wrapper of the leave icon
  fireEvent.mouseOver(screen.getByTestId("leave-icon-wrapper"));
  expect(screen.getByTestId("leave-icon")).toHaveClass("text-white");

  // when mouse leave
  fireEvent.mouseLeave(screen.getByTestId("leave-icon-wrapper"));
  expect(screen.getByTestId("leave-icon")).toHaveClass("text-transparent");

  //screen.debug();
});
