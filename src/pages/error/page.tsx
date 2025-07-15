import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/button';

interface ErrorPageProps {
    error?: Error;
    errorInfo?: React.ErrorInfo;
    resetError?: () => void;
}

const ErrorPage = ({ error, errorInfo, resetError }: ErrorPageProps) => {
    const handleReload = () => {
        if (resetError) {
            resetError();
        } else {
            window.location.reload();
        }
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <>
            <Helmet>
                <title>Something went wrong | Lekas</title>
                <meta name="description" content="An unexpected error occurred. Please try again or contact support if the problem persists." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="min-h-screen bg-background flex items-center justify-center px-4">
                <div className="max-w-lg mx-auto text-center">
                    <div className="mb-8">
                        <div className="text-8xl mb-4">⚠️</div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6">
                            We encountered an unexpected error. Don't worry, our team has been notified and we're working to fix it.
                        </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 mb-8">
                        <details className="text-left">
                            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                                Technical Details (Click to expand)
                            </summary>
                            <div className="mt-3 text-xs">
                                {error && (
                                    <div className="mb-2">
                                        <strong>Error:</strong>
                                        <pre className="whitespace-pre-wrap break-words mt-1 text-destructive">
                                            {error.message}
                                        </pre>
                                    </div>
                                )}
                                {error?.stack && (
                                    <div>
                                        <strong>Stack Trace:</strong>
                                        <pre className="whitespace-pre-wrap break-words mt-1 text-xs text-muted-foreground max-h-32 overflow-y-auto">
                                            {error.stack}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </details>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleReload}
                            size="lg"
                            className="w-full"
                        >
                            Try Again
                        </Button>

                        <Button
                            onClick={handleGoHome}
                            variant="outline"
                            size="lg"
                            className="w-full"
                        >
                            Go to Homepage
                        </Button>
                    </div>

                    <div className="mt-8">
                        <p className="text-sm text-muted-foreground">
                            If this problem persists, please{' '}
                            <a
                                href="/contact"
                                className="text-primary hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = '/contact';
                                }}
                            >
                                contact our support team
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage; 