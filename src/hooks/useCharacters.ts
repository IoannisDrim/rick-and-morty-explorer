import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "@graphql";

export function useCharacters(name?: string) {
  const filterVars = name ? { filter: { name } } : undefined;
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1, ...filterVars },
  });

  return {
    characters: data?.characters?.results?.filter((c): c is NonNullable<typeof c> => c !== null),
    nextPage: data?.characters?.info?.next ?? null,
    loading,
    error,
    fetchMore,
  };
}
