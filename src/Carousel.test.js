import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("smoke test", () => {
  render(<Carousel />);
});

it("snapshot test", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("left arrow works", () => {
  const { getByText, getByTestId } = render(<Carousel />);
  
  fireEvent.click(getByTestId(`right-arrow`));
  
  const h4 = getByText(`Photo by Pratik Patel on Unsplash`)

  fireEvent.click(getByTestId(`left-arrow`));

  expect(h4).toHaveTextContent(`Photo by Richard Pasquarella on Unsplash`);
});

it("left arrow missing when 1st image", () => {
  const { getByTestId } = render(<Carousel />);

  expect(() => getByTestId(`left-arrow`)).toThrow('Unable to find an element');
});

it("right arrow missing when last image", () => {
  const { getByTestId } = render(<Carousel />);
  fireEvent.click(getByTestId(`right-arrow`));
  fireEvent.click(getByTestId(`right-arrow`));

  expect(() => getByTestId(`right-arrow`)).toThrow('Unable to find an element');
})