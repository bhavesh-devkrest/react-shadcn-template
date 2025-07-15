import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | Lekas</title>
                <meta name="description" content="The page you are looking for could not be found. Return to Lekas homepage or contact us for assistance." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-md mx-auto">
                    <div className="mb-8">
                        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                        <h2 className="text-3xl font-semibold text-foreground mb-4">
                            Page Not Found
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Sorry, the page you are looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button asChild size="lg" className="w-full">
                            <Link to="/">
                                Go Back Home
                            </Link>
                        </Button>

                        <Button asChild variant="outline" size="lg" className="w-full">
                            <Link to="/contact">
                                Contact Support
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-sm text-muted-foreground">
                            Use the navigation above to find what you're looking for
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage; 