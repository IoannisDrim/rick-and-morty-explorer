import { useCallback } from "react";
import LoadingIndicator from "@components/LoadingIndicator";
import Scroller from "@components/Scroller";
import CharacterListItem from "./components/CharacterListItem";
import CharacterListItemSkeleton from "./components/CharacterListItemSkeleton";
import type { CharactersListProps, CharacterItem } from "./CharactersList.types";
import styles from "./CharactersList.module.css";

function CharactersList({
  loading,
  loadingMore = false,
  characters,
  onEndReached,
  cacheKey,
  loadMoreError,
  onRetry,
}: CharactersListProps) {
  const renderItem = useCallback(
    (_: number, item: CharacterItem) => <CharacterListItem item={item} />,
    []
  );

  // Wrapper is always rendered with a stable height, so the layout doesn't
  // jump when transitioning between loading / empty / list states.
  return (
    <div className={styles.wrapper}>
      {loading && !characters ? (
        <div className={styles.centerContent}>
          <LoadingIndicator />
        </div>
      ) : !characters?.length ? (
        <div className={styles.centerContent}>
          <p className={styles.empty}>No characters found.</p>
        </div>
      ) : (
        <Scroller<CharacterItem>
          data={characters}
          itemContent={renderItem}
          Skeleton={CharacterListItemSkeleton}
          isLoadingMore={loadingMore}
          onEndReached={onEndReached}
          cacheKey={cacheKey}
          loadMoreError={loadMoreError}
          onRetry={onRetry}
        />
      )}
    </div>
  );
}

export default CharactersList;
