import Button from "@shared/ui/Button";
import type { ScrollerContext } from "../../Scroller.types";
import styles from "./ScrollerFooter.module.css";

const DEFAULT_SKELETON_COUNT = 3;

// Module-level so Virtuoso receives a stable component reference. Skeleton
// component and visibility flag arrive via Virtuoso's `context` prop, set by
// Scroller.
function ScrollerFooter({ context }: { context?: ScrollerContext }) {
  if (context?.loadMoreError) {
    return (
      <div className={styles.error}>
        <p className={styles.errorMessage}>Failed to load more characters.</p>
        <Button onClick={context.onRetry}>Retry</Button>
      </div>
    );
  }

  const Skeleton = context?.Skeleton;
  if (!context?.isLoadingMore || !Skeleton) return null;

  const count = context.skeletonCount ?? DEFAULT_SKELETON_COUNT;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={`skeleton-${i}`} />
      ))}
    </>
  );
}

export default ScrollerFooter;
