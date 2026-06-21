import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center bg-app text-main" role="alert">
                    <div className="w-20 h-20 mb-6 rounded-full bg-red-100 dark:bg-red-950/30 flex justify-center items-center text-red-500 dark:text-red-400 text-4xl">
                        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                    <p className="max-w-md text-muted mb-6 text-sm">
                        An unexpected error occurred in the application: {this.state.error?.message || "Unknown error"}.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-neutral-950 font-semibold rounded-xl shadow-md transition-all duration-200"
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
