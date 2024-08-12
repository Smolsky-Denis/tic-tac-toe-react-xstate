import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import Tile from "./Tile";

describe("Tile Component", () => {
  const mockOnClick = jest.fn();

  test("renders tile with correct player", () => {
    render(<Tile index={0} onClick={mockOnClick} player="x"/>);
    const tile = screen.getByTestId("tile-0");
    console.log(tile);
    expect(tile).toHaveAttribute("data-player", "x");
  });

  test("handles tile click", () => {
    render(<Tile index={0} onClick={mockOnClick} player={null}/>);
    const tile = screen.getByTestId("tile-0");
    fireEvent.click(tile);
    expect(mockOnClick).toHaveBeenCalled();
  });
});