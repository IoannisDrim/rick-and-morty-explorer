import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Input from "./Input";

describe("Input", () => {
  it("should render a text input", () => {
    render(<Input />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should render a label associated with the input when the label prop is provided", () => {
    render(<Input label="Search" id="search" />);

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("should not render a label element when the label prop is omitted", () => {
    const { container } = render(<Input />);

    expect(container.querySelector("label")).not.toBeInTheDocument();
  });

  it("should display the placeholder text", () => {
    render(<Input placeholder="Search by name..." />);

    expect(screen.getByPlaceholderText("Search by name...")).toBeInTheDocument();
  });

  it("should call onChange when the user types", async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);

    await userEvent.type(screen.getByRole("textbox"), "Rick");

    expect(onChange).toHaveBeenCalled();
  });

  it("should reflect the typed value in a controlled input", async () => {
    const Controlled = () => {
      const [value, setValue] = useState("");
      return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
    };

    render(<Controlled />);

    await userEvent.type(screen.getByRole("textbox"), "Morty");

    expect(screen.getByRole("textbox")).toHaveValue("Morty");
  });
});
