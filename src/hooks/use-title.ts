import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useTitle = (title: string) => {
    const location = useLocation();

    useEffect(() => {
        // Update document title immediately
        document.title = title;

        // Force a reflow to ensure the title change is processed
        document.querySelector('title')?.textContent;

        // Additional safety measure - update after a small delay
        const timeoutId = setTimeout(() => {
            if (document.title !== title) {
                document.title = title;
            }
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [title, location.pathname]);

    // Additional effect to handle browser navigation
    useEffect(() => {
        const handlePopState = () => {
            // Small delay to allow React to render the new component
            setTimeout(() => {
                if (document.title !== title) {
                    document.title = title;
                }
            }, 100);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [title]);
}; 