import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class CustomErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  // Use static getDerivedStateFromError() to render a fallback UI after an error has been thrown.
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Use componentDidCatch() to log error information.
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // You can also log the error to an error reporting service here.
  }

  public render() {
    if (this.state.hasError) {
      // Render the custom fallback UI
      return this.props.fallback || <h1>An unexpected error occurred.</h1>;
    }

    return this.props.children;
  }
}

export default CustomErrorBoundary;
