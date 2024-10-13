import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputApp from "../src/InputApp";
import Input from "../src/Input";

describe("InputApp Component", () => {
  it("correctly updates input value", async () => {
    const user = userEvent.setup();
    render(<InputApp />);

    const input = screen.getByRole("textbox");
    await user.type(input, "potato");

    expect(input.value).toBe("potato");
  });

  it("calls the callback function every time input value is changed", async () => {
    const user = userEvent.setup();

    const handleChange = vi.fn();

    render(<Input handleChange={handleChange} inputValue="" />);

    const input = screen.getByRole("textbox");

    let typed = "potato";
    await user.type(input, typed);

    expect(handleChange).toHaveBeenCalledTimes(typed.length);
  });
});
