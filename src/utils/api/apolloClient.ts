import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import type { FieldPolicy } from "@apollo/client/cache";
import { GetCharactersQuery } from "@graphql";

type CharactersField = NonNullable<GetCharactersQuery["characters"]>;

const charactersField: FieldPolicy<CharactersField, CharactersField> = {
  // Separate cache entries per filter value so that switching search
  // terms never blends results from different queries.
  keyArgs: ["filter"],
  // Append incoming results to the existing list rather than replacing it,
  // enabling infinite scroll page accumulation.
  merge(existing, incoming) {
    return {
      ...incoming,
      results: [...(existing?.results ?? []), ...(incoming.results ?? [])],
    };
  },
};

const apolloClient = new ApolloClient({
  link: new HttpLink({
    // On production ready system this should be declared on a .env file
    uri: "https://rickandmortyapi.com/graphql/",
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: charactersField,
        },
      },
    },
  }),
});

export default apolloClient;
