import { render, screen } from "@testing-library/react";
import CharacterListItem from "./CharacterListItem";

const mockItem = {
  id: "1",
  name: "Rick Sanchez",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

describe("CharacterListItem", () => {
  it("should render the character name", () => {
    render(<CharacterListItem item={mockItem} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("should render the character species", () => {
    render(<CharacterListItem item={mockItem} />);

    expect(screen.getByText("Human")).toBeInTheDocument();
  });

  it("should render the character image with the correct alt text", () => {
    render(<CharacterListItem item={mockItem} />);

    expect(screen.getByRole("img", { name: /rick sanchez/i })).toBeInTheDocument();
  });

  it("should render the character image with the correct src", () => {
    render(<CharacterListItem item={mockItem} />);

    expect(screen.getByRole("img", { name: /rick sanchez/i })).toHaveAttribute(
      "src",
      mockItem.image
    );
  });

  it("should render without crashing when name, species and image are null", () => {
    render(<CharacterListItem item={{ id: "1", name: null, species: null, image: null }} />);

    // img with empty alt is decorative (role="presentation"); assert via listitem
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });
});
