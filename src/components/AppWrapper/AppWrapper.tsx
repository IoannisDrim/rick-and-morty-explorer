import styles from "./AppWrapper.module.css";
import type { AppWrapperProps } from "@components/AppWrapper/AppWrapper.types";

function AppWrapper({ children }: AppWrapperProps) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default AppWrapper;
