import React from "react";

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  // if an error happened, set the state to true
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    // if error happened, return a fallback component
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
