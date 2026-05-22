import type { GetCharactersQuery } from "@graphql";

// Derived from the query result rather than the schema's full Character type.
// The schema Character has many fields (episode, location, status, etc.) that
// we never request, including some that are non-optional — using it directly
// would make our component lie about the shape of its props. Deriving from the
// query result means this type stays in sync with the GetCharacters operation
// automatically after each codegen run: add a field to the query, it appears
// here for free.
export type CharacterItem = NonNullable<
  NonNullable<NonNullable<GetCharactersQuery["characters"]>["results"]>[number]
>;

export type VirtuosoContext = {
  loadingMore: boolean;
};

export type CharactersListProps = {
  loading: boolean;
  loadingMore?: boolean;
  characters?: CharacterItem[];
  onEndReached?: () => void;
  /**
   * Identifier under which Virtuoso's scroll snapshot is stored. When the
   * component remounts (e.g. after returning from another route) and is given
   * the same cacheKey, the previous scroll position is restored.
   */
  cacheKey: string;
  loadMoreError?: boolean;
  onRetry?: () => void;
};
