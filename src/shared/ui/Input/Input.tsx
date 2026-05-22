import type { InputProps } from "./Input.types";
import styles from "./Input.module.css";

function Input({ label, id, className, ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className={`${styles.input}${className ? ` ${className}` : ""}`} {...props} />
    </div>
  );
}

export default Input;
