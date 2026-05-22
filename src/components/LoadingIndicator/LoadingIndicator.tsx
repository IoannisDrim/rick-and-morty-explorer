import styles from "./LoadingIndicator.module.css";

const LoadingIndicator = () => (
  <div className={styles.wrapper} role="img" aria-label="loading indicator">
    <div className={styles.ring} />
    <div className={styles.ringInner} />
    <div className={styles.core} />
  </div>
);

export default LoadingIndicator;
