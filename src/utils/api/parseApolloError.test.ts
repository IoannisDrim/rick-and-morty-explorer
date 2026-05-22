import { parseApolloError } from "./parseApolloError";

describe("parseApolloError", () => {
  it("returns the fallback message for an unknown error", () => {
    expect(parseApolloError(new Error("boom"))).toEqual({
      message: "Something went wrong. Please refresh the page.",
    });
  });

  it("accepts a custom fallback message", () => {
    expect(parseApolloError(new Error("boom"), "Custom fallback.")).toEqual({
      message: "Custom fallback.",
    });
  });

  it("returns a network error message with HTTP status code when present", () => {
    const error = Object.assign(new Error("Network error"), {
      networkError: Object.assign(new Error("503"), { statusCode: 503 }),
    });

    expect(parseApolloError(error)).toEqual({
      message: "Unable to reach the server. Please check your connection and refresh the page.",
      detail: "Network error (HTTP 503)",
    });
  });

  it("returns a network error message without status code when absent", () => {
    const error = Object.assign(new Error("Network error"), {
      networkError: new Error("connection refused"),
    });

    expect(parseApolloError(error)).toEqual({
      message: "Unable to reach the server. Please check your connection and refresh the page.",
      detail: "Network error",
    });
  });

  it("returns a GraphQL error message with all error messages joined", () => {
    const error = Object.assign(new Error("GraphQL error"), {
      graphQLErrors: [{ message: "Character not found" }, { message: "Unauthorised" }],
    });

    expect(parseApolloError(error)).toEqual({
      message: "Something went wrong fetching the data. Please refresh the page.",
      detail: "Character not found · Unauthorised",
    });
  });

  it("prefers networkError over graphQLErrors when both are present", () => {
    const error = Object.assign(new Error("mixed"), {
      networkError: Object.assign(new Error("500"), { statusCode: 500 }),
      graphQLErrors: [{ message: "also an error" }],
    });

    const result = parseApolloError(error);
    expect(result.message).toMatch(/unable to reach the server/i);
  });
});
