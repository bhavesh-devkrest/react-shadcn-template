import type { ReactNode } from 'react';
import React, { Component } from 'react';
import ErrorPage from '../../pages/error/page';

interface Props {
    children: ReactNode;
    fallback?: React.ComponentType<{
        error: Error;
        errorInfo: React.ErrorInfo;
        resetError: () => void;
    }>;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error details for debugging
        console.error('Error caught by error boundary:', error, errorInfo);

        // Update state with error info
        this.setState({
            error,
            errorInfo,
        });

        // You can also log the error to an error reporting service here
        this.logErrorToService(error, errorInfo);
    }

    logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.group('🚨 Error Boundary Caught an Error');
            console.error('Error:', error);
            console.error('Component Stack:', errorInfo.componentStack);
            console.groupEnd();
        }

        // In production, you would send this to your error monitoring service
        // Example: Sentry, LogRocket, Bugsnag, etc.
        // Sentry.captureException(error, { contexts: { react: errorInfo } });
    };

    resetError = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            // Check if custom fallback component is provided
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return (
                    <FallbackComponent
                        error={this.state.error!}
                        errorInfo={this.state.errorInfo!}
                        resetError={this.resetError}
                    />
                );
            }

            // Default fallback to ErrorPage
            return (
                <ErrorPage
                    error={this.state.error!}
                    errorInfo={this.state.errorInfo!}
                    resetError={this.resetError}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 