type ApolloLikeError = {
  networkError?: ({ statusCode?: number } & Error) | null;
  graphQLErrors?: readonly { message: string }[];
};

export type ParsedApolloError = {
  message: string;
  detail?: string;
};

const DEFAULT_FALLBACK = "Something went wrong. Please refresh the page.";

// Apollo v4 types useQuery's error as ErrorLike, hiding networkError and graphQLErrors.
// We cast structurally so the caller doesn't need to import Apollo internals.
export function parseApolloError(
  error: unknown,
  fallbackMessage = DEFAULT_FALLBACK
): ParsedApolloError {
  const apolloError = error as ApolloLikeError | undefined;

  if (apolloError?.networkError) {
    return {
      message: "Unable to reach the server. Please check your connection and refresh the page.",
      detail: apolloError.networkError.statusCode
        ? `Network error (HTTP ${apolloError.networkError.statusCode})`
        : "Network error",
    };
  }

  if (apolloError?.graphQLErrors?.length) {
    return {
      message: "Something went wrong fetching the data. Please refresh the page.",
      detail: apolloError.graphQLErrors.map((e) => e.message).join(" · "),
    };
  }

  return { message: fallbackMessage };
}
