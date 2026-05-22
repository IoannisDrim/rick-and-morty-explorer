import { Component, type ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";

type Props = {
  children: ReactNode;
  /**
   * When this value changes, any caught error is cleared. Use it to reset the
   * boundary across navigation (e.g. `resetKey={location.pathname}`) so a
   * crash on one route doesn't persist after the user navigates away.
   */
  resetKey?: string;
};
type State = { error: Error | null };

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.wrapper}>
          <p>Something went wrong. Please refresh the page.</p>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
