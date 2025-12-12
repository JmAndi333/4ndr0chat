import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service or console
    console.error("Uncaught error in ChatMessage component:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Render a fallback UI for the failed component
      return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-28 text-left pt-3">
                <span className="font-body text-sm text-[var(--text-tertiary)] select-none">[SYSTEM]</span>
            </div>
            <div className="relative group max-w-2xl w-full">
                <div className="chat-bubble rounded-lg p-4 bg-red-900/30 border border-red-500/50">
                    <p className="text-red-400 font-bold">[[ RENDER_FAULT ]] A fatal error occurred while rendering this message.</p>
                    <p className="text-red-400/80 text-sm mt-2">The component failed to mount. Please check the console for detailed error logs. The rest of the application remains operational.</p>
                </div>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;