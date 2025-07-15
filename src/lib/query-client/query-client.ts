import { QueryClient } from '@tanstack/react-query';

// Query client configuration
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Time in milliseconds that the data is considered fresh
            staleTime: 5 * 60 * 1000, // 5 minutes

            // Time in milliseconds that unused/inactive cache data remains in memory
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

            // Number of times to retry failed requests
            retry: (failureCount, error: any) => {
                // Don't retry for 4xx errors (client errors)
                if (error?.response?.status >= 400 && error?.response?.status < 500) {
                    return false;
                }
                // Retry up to 3 times for other errors
                return failureCount < 3;
            },

            // Delay between retries
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

            // Refetch on window focus
            refetchOnWindowFocus: false,

            // Refetch on reconnect
            refetchOnReconnect: true,

            // Refetch on mount if data is stale
            refetchOnMount: true,
        },
        mutations: {
            // Number of times to retry failed mutations
            retry: 1,

            // Retry delay for mutations
            retryDelay: 1000,
        },
    },
});

// Query keys factory for consistent key management
export const queryKeys = {
    // Base keys
    all: ['api'] as const,

    // Users
    users: () => [...queryKeys.all, 'users'] as const,
    user: (id: string) => [...queryKeys.users(), id] as const,
    userProfile: () => [...queryKeys.users(), 'profile'] as const,

    // Posts
    posts: () => [...queryKeys.all, 'posts'] as const,
    post: (id: string) => [...queryKeys.posts(), id] as const,
    postsByUser: (userId: string) => [...queryKeys.posts(), 'user', userId] as const,

    // Services
    services: () => [...queryKeys.all, 'services'] as const,
    service: (id: string) => [...queryKeys.services(), id] as const,

    // Contact
    contact: () => [...queryKeys.all, 'contact'] as const,
    contactForm: () => [...queryKeys.contact(), 'form'] as const,
} as const; 