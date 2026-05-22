import { graphql } from "@graphql";

export const GET_CHARACTERS = graphql(`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        next
      }
      results {
        id
        image
        name
        species
      }
    }
  }
`);
