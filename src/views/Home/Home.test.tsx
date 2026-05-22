import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { type GetCharactersQuery, GetCharactersDocument } from "@graphql";
import Home from "./Home";

// Virtuoso requires DOM layout measurements unavailable in jsdom.
// Mocking it to render items directly keeps tests focused on app behaviour.
vi.mock("react-virtuoso", () => ({
  Virtuoso: ({
    data,
    itemContent,
  }: {
    data: unknown[];
    itemContent: (index: number, item: unknown) => ReactNode;
  }) => (
    <div>
      {data?.map((item, i) => (
        <div key={i}>{itemContent(i, item)}</div>
      ))}
    </div>
  ),
}));

const mockCharacters: GetCharactersQuery = {
  characters: {
    info: { next: null },
    results: [
      { id: "1", name: "Rick Sanchez", species: "Human", image: "rick.jpg" },
      { id: "2", name: "Morty Smith", species: "Human", image: "morty.jpg" },
    ],
  },
};

const successMock = {
  request: {
    query: GetCharactersDocument,
    variables: { page: 1 },
  },
  result: { data: mockCharacters },
};

const emptyResultsMock = {
  request: {
    query: GetCharactersDocument,
    variables: { page: 1 },
  },
  result: {
    data: {
      characters: {
        info: { next: null },
        results: [],
      },
    } satisfies GetCharactersQuery,
  },
};

// MockedProvider with `error` sends a plain Error — Apollo v4 does not wrap it
// into an ApolloError with a networkError property, so the generic message shows.
const networkErrorMock = {
  request: {
    query: GetCharactersDocument,
    variables: { page: 1 },
  },
  error: new Error("Network error"),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderHome = (mocks: any[] = [successMock]) =>
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockedProvider>
  );

describe("Home", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should show the loading indicator on initial render", () => {
    renderHome();

    expect(screen.getByRole("img", { name: /loading indicator/i })).toBeInTheDocument();
  });

  it("should render the search input after data has loaded", async () => {
    renderHome();

    expect(await screen.findByPlaceholderText(/search by name/i)).toBeInTheDocument();
  });

  it("should render character names after the query resolves", async () => {
    renderHome();

    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("should show a no-results message when the query returns no characters", async () => {
    renderHome([emptyResultsMock]);

    expect(await screen.findByText(/no characters found/i)).toBeInTheDocument();
  });

  it("should show the fallback message when the error has neither networkError nor graphQLErrors", async () => {
    renderHome([networkErrorMock]);

    expect(await screen.findByText(/failed to load characters/i)).toBeInTheDocument();
  });
});
