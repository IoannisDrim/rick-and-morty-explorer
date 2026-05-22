import { useState, type SubmitEvent } from "react";
import { useSearchParams } from "react-router-dom";
import CharactersList from "@components/CharactersList";
import Input from "@shared/ui/Input";
import Button from "@shared/ui/Button";
import { useCharacters } from "@hooks/useCharacters";
import { usePagination } from "@hooks/usePagination";
import { parseApolloError } from "@utils/api/parseApolloError";
import styles from "./Home.module.css";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeName = searchParams.get("name") ?? "";
  const [inputValue, setInputValue] = useState(activeName);

  const { characters, loading, error, fetchMore, nextPage } = useCharacters(activeName);
  const { loadingMore, loadMoreError, handleEndReached, retryLoadMore, resetLoadMoreError } =
    usePagination(fetchMore, nextPage);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetLoadMoreError();
    const trimmed = inputValue.trim();
    setSearchParams(trimmed ? { name: trimmed } : {}, { replace: true });
  };

  const { message: errorMessage, detail: errorDetail } = parseApolloError(
    error,
    "Failed to load characters. Please refresh the page."
  );

  return (
    <div>
      <section className={styles.textCenter}>
        <h2>Welcome to Rick and Morty explorer!</h2>
        <p>You can find all important information on docs page</p>
      </section>
      <form className={styles.search} onSubmit={handleSubmit}>
        <Input
          key={activeName}
          placeholder="Search by name..."
          aria-label="Search characters by name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          name="name"
        />
        <Button type="submit">Search</Button>
      </form>
      <section className={styles.textCenter}>
        {error ? (
          <div className={styles.error}>
            <p>{errorMessage}</p>
            {errorDetail && <p className={styles.errorDetail}>{errorDetail}</p>}
          </div>
        ) : (
          <CharactersList
            loading={loading}
            loadingMore={loadingMore}
            characters={characters}
            onEndReached={handleEndReached}
            cacheKey={activeName}
            loadMoreError={loadMoreError}
            onRetry={retryLoadMore}
          />
        )}
      </section>
    </div>
  );
}

export default Home;
