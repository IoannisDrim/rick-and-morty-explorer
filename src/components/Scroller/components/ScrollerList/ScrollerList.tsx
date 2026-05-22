import { forwardRef, type CSSProperties, type ReactNode, type Ref } from "react";
import styles from "./ScrollerList.module.css";

// Renders the inner list element as <ul> instead of Virtuoso's default <div>,
// so the rendered <li> rows have a proper list-typed parent. Virtuoso's
// components.List slot is typed for an HTMLDivElement ref, so the forwarded
// ref is declared as such and cast on the JSX — Virtuoso only stores the ref,
// it doesn't invoke div-specific methods on it.
const ScrollerList = forwardRef<HTMLDivElement, { style?: CSSProperties; children?: ReactNode }>(
  ({ style, children }, ref) => (
    <ul ref={ref as Ref<HTMLUListElement>} style={style} className={styles.list}>
      {children}
    </ul>
  )
);
ScrollerList.displayName = "ScrollerList";

export default ScrollerList;
