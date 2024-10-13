import { vi, describe, it, expect } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../src/App";

window.fetch = vi.fn(() => {
  const user = { name: "Jack", email: "jack@email.com" };
  return Promise.resolve({ json: () => Promise.resolve(user) });
});

describe("App Component", () => {
  it("shows loading text while API request is in progress", async () => {
    render(<App />);
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
    screen.debug();

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });

  it("renders user name", async () => {
    render(<App />);
    const userName = await screen.findByText("Jack");
    expect(userName).toBeInTheDocument();
    screen.debug();
  });

  it("shows error message", async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ message: "API is down" });
    });

    render(<App />);

    const errorMessage = await screen.findByText("API is down");
    expect(errorMessage).toBeInTheDocument();
    screen.debug();
  });
});
