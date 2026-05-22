import { useCallback, useMemo, useRef } from "react";
import { Virtuoso, type StateSnapshot, type VirtuosoHandle } from "react-virtuoso";
import ScrollerList from "./components/ScrollerList";
import ScrollerFooter from "./components/ScrollerFooter";
import type { ScrollerProps, ScrollerContext } from "./Scroller.types";
import styles from "./Scroller.module.css";

const MAX_SNAPSHOTS = 30;
// Module-level cache so snapshots survive the consumer's unmounting when the user
// navigates to another route. Keyed by `cacheKey` so different keys (e.g.
// different filters) don't restore each other's scroll position.
const scrollSnapshots = new Map<string, StateSnapshot>();

function Scroller<T>({
  data,
  itemContent,
  onEndReached,
  cacheKey,
  Skeleton,
  isLoadingMore,
  skeletonCount,
  loadMoreError,
  onRetry,
}: ScrollerProps<T>) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  // Capture the snapshot continuously as the user scrolls. By the time the
  // component unmounts (route change), the latest snapshot is already saved,
  // so we don't depend on the ref still being attached during cleanup.
  const handleRangeChanged = useCallback(() => {
    if (cacheKey === undefined) return;
    virtuosoRef.current?.getState((snapshot) => {
      if (!scrollSnapshots.has(cacheKey) && scrollSnapshots.size >= MAX_SNAPSHOTS) {
        const firstKey = scrollSnapshots.keys().next().value;
        if (firstKey !== undefined) scrollSnapshots.delete(firstKey);
      }
      scrollSnapshots.set(cacheKey, snapshot);
    });
  }, [cacheKey]);

  const context: ScrollerContext = useMemo(
    () => ({ Skeleton, isLoadingMore, skeletonCount, loadMoreError, onRetry }),
    [Skeleton, isLoadingMore, skeletonCount, loadMoreError, onRetry]
  );

  return (
    <Virtuoso
      ref={virtuosoRef}
      className={styles.scroller}
      data={data}
      context={context}
      itemContent={itemContent}
      endReached={onEndReached}
      followOutput={false}
      components={{ List: ScrollerList, Footer: ScrollerFooter }}
      restoreStateFrom={cacheKey !== undefined ? scrollSnapshots.get(cacheKey) : undefined}
      rangeChanged={handleRangeChanged}
    />
  );
}

export default Scroller;
