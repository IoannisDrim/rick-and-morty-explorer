import type { ComponentType, ReactNode } from "react";

export type ScrollerProps<T> = {
  /** Items to render. Each one is passed to `itemContent`. */
  data: T[];
  /** Renderer for a single item. Signature matches Virtuoso's. */
  itemContent: (index: number, item: T) => ReactNode;
  /** Fires when the user scrolls to the bottom of the list. */
  onEndReached?: () => void;
  /**
   * Identifier under which the scroll snapshot is stored. When the component
   * remounts and is given the same key, the previous scroll position is
   * restored. Omit to skip scroll preservation.
   */
  cacheKey?: string;
  /** Component rendered repeatedly at the bottom while more data is loading. */
  Skeleton?: ComponentType;
  /** When true, `Skeleton` is rendered `skeletonCount` times. */
  isLoadingMore?: boolean;
  /** Number of skeleton instances to render. Defaults to 3. */
  skeletonCount?: number;
  /** When true, the footer shows an error message with a retry button. */
  loadMoreError?: boolean;
  /** Called when the user clicks the Retry button in the footer. */
  onRetry?: () => void;
};

/**
 * Internal contract between Scroller and ScrollerFooter. Virtuoso passes its
 * own `context` prop to module-level component slots, so this is how the
 * Skeleton/isLoadingMore inputs reach the (intentionally module-level) footer.
 */
export type ScrollerContext = {
  Skeleton?: ComponentType;
  isLoadingMore?: boolean;
  skeletonCount?: number;
  loadMoreError?: boolean;
  onRetry?: () => void;
};
