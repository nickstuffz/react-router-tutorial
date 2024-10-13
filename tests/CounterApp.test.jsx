import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CounterApp from "../src/CounterApp";

describe("CounterApp Component", () => {
  it("increments on increment button click", async () => {
    const user = userEvent.setup();

    render(<CounterApp />);

    const counter = screen.getByTestId("counter");
    const incrementBtn = screen.getByText("Increment");

    await user.click(incrementBtn);
    await user.click(incrementBtn);

    expect(counter.textContent).toEqual("2");
  });

  it("decrements on decrement button click", async () => {
    const user = userEvent.setup();

    render(<CounterApp />);

    const counter = screen.getByTestId("counter");
    const decrementBtn = screen.getByText("Decrement");

    await user.click(decrementBtn);
    await user.click(decrementBtn);

    expect(counter.textContent).toEqual("-2");
  });
});
