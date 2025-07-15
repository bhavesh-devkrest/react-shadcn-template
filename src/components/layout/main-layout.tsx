import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../navigation/nav-bar';

const MainLayout = () => {
    const location = useLocation();

    // Force title update on route change
    useEffect(() => {
        // Small delay to ensure the page component has rendered and set its title
        const timeoutId = setTimeout(() => {
            // Force a title update by ensuring React Helmet processes the changes
            document.dispatchEvent(new Event('title-update'));
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-background">
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout; 