/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "../src/components/Landing";

describe("Landing Page", () => {
  test("should show the landing component", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    expect(screen.getByText("!A la aventura!")).toBeDefined();
  });
});
