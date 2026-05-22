# Rick and Morty Explorer

A portfolio demo built with React 19, TypeScript, and Apollo Client. Browse and search over 800 characters from the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) with infinite scroll, URL-persistent search, and full error handling.

## Highlights

### React performance
- Virtualised list via `react-virtuoso` — only visible rows are in the DOM regardless of how many pages have loaded, keeping scroll smooth across 800+ characters.
- `React.memo` on list rows so Virtuoso skips re-rendering items whose data hasn't changed as new pages arrive.
- Stable component references and memoised callbacks throughout to avoid unnecessary work on every render.
- Scroll position is preserved when navigating away and back, using a module-level snapshot cache keyed by active filter.

### Error handling
- Apollo errors are classified by type (network, GraphQL, unknown) and surfaced with a message appropriate to each failure mode.
- A class-based `ErrorBoundary` catches render-phase errors and resets automatically on route change, so a crash on one page doesn't persist after navigating away.
- Pagination failures (failed `fetchMore`) are caught inline at the bottom of the list with a Retry button. A ref-based guard prevents Virtuoso's `endReached` from re-firing automatically after a failure, eliminating the infinite retry loop that would otherwise occur.

### GraphQL and server state
- `@graphql-codegen/client-preset` generates exact TypeScript types from the live schema — query variables and response shapes are both checked at compile time.
- Apollo's `InMemoryCache` is configured with a typed `FieldPolicy` that accumulates pages per filter key, so infinite scroll is handled entirely by the cache without any client-side array management.
- Data fetching is isolated in custom hooks (`useCharacters`, `usePagination`) keeping views free of data-layer concerns.
- Search state lives in the URL (`?name=`) as the single source of truth — results survive refresh and are shareable via link.

## Tech stack

| | |
|---|---|
| UI | React 19 + TypeScript |
| Bundler | Vite 7 |
| GraphQL client | Apollo Client v4 |
| GraphQL codegen | `@graphql-codegen/client-preset` |
| Virtualisation | `react-virtuoso` |
| Routing | React Router v7 |
| Styling | CSS Modules |
| Testing | Jest + React Testing Library |

## Getting started

```bash
yarn install   # install dependencies
yarn dev       # dev server at http://localhost:3000
yarn build     # type-check + production build
yarn test      # run test suite
```
