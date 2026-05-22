import { useCallback, useRef, useState } from "react";

export function usePagination(
  fetchMore: (options: { variables: { page: number } }) => Promise<unknown>,
  nextPage: number | null
) {
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);
  // Prevents concurrent fetches without adding loadingMore to useCallback deps.
  const loadingMoreRef = useRef(false);
  // After a failed fetch the user is still at the bottom of the list, so
  // Virtuoso keeps firing endReached. This ref blocks those automatic re-fires
  // until the user explicitly clicks Retry.
  const hasErrorRef = useRef(false);

  const doFetch = useCallback(() => {
    if (nextPage == null || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    hasErrorRef.current = false;
    setLoadingMore(true);
    setLoadMoreError(false);
    fetchMore({ variables: { page: nextPage } })
      .catch(() => {
        hasErrorRef.current = true;
        setLoadMoreError(true);
      })
      .finally(() => {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      });
  }, [fetchMore, nextPage]);

  const handleEndReached = useCallback(() => {
    if (hasErrorRef.current) return;
    doFetch();
  }, [doFetch]);

  const retryLoadMore = useCallback(() => {
    hasErrorRef.current = false;
    doFetch();
  }, [doFetch]);

  const resetLoadMoreError = useCallback(() => {
    hasErrorRef.current = false;
    setLoadMoreError(false);
  }, []);

  return { loadingMore, loadMoreError, handleEndReached, retryLoadMore, resetLoadMoreError };
}
