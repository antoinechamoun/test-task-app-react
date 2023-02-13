import { render, screen } from "@testing-library/react";
import Form from "../components/Form";

describe("Form Component", () => {
  it("renders a button with an add new task text", () => {
    render(<Form />);
    expect(screen.getByRole("button").textContent).toMatch(/Add new task/i);
  });
});
