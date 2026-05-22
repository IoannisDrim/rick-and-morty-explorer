import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

function Button({ type = "button", className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export default Button;
