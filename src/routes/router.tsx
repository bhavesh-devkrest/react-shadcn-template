import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/main-layout';
import Loading from '../components/ui/loading';

// Lazy load page components
const HomePage = lazy(() => import('../pages/home/page'));
const AboutUsPage = lazy(() => import('../pages/about-us/page'));
const ServicePage = lazy(() => import('../pages/service/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const NotFoundPage = lazy(() => import('../pages/not-found/page'));

// Suspense wrapper component
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<Loading />}>{children}</Suspense>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <SuspenseWrapper>
                        <HomePage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: 'about-us',
                element: (
                    <SuspenseWrapper>
                        <AboutUsPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: 'service',
                element: (
                    <SuspenseWrapper>
                        <ServicePage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: 'contact',
                element: (
                    <SuspenseWrapper>
                        <ContactPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: 'page',
                element: (
                    <SuspenseWrapper>
                        <div className="container mx-auto px-4 py-8">
                            <h1 className="text-4xl font-bold text-primary mb-6">Page</h1>
                            <p className="text-lg text-muted-foreground">This is a placeholder page.</p>
                        </div>
                    </SuspenseWrapper>
                ),
            },
            {
                path: '*',
                element: (
                    <SuspenseWrapper>
                        <NotFoundPage />
                    </SuspenseWrapper>
                ),
            },
        ],
    },
]); 