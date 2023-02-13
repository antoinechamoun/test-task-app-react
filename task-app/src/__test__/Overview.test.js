import { fireEvent, render, screen } from "@testing-library/react";
import Overview from "../components/Overview";
import userEvent from "@testing-library/user-event";
describe("Form Component", () => {
  it("renders an empty task initially", () => {
    const { container } = render(<Overview />);
    expect(container).toMatchSnapshot();
  });

  it("adds a new task after button click", () => {
    render(<Overview />);
    const input = screen.getByTestId("input-value");
    fireEvent.change(input, { target: { value: "Clean" } });
    const button = screen.getByRole("button", { name: "Add new task" });
    userEvent.click(button);

    expect(screen.getByTestId("value-output").textContent).toMatch(/Clean/i);
  });
});
