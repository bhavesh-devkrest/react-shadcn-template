import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        config.metadata = { startTime: new Date() };

        // Log request in development
        if (import.meta.env.DEV) {
            console.log('🚀 API Request:', {
                method: config.method?.toUpperCase(),
                url: config.url,
                data: config.data,
            });
        }

        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Calculate request duration
        const duration = response.config.metadata?.startTime
            ? new Date().getTime() - response.config.metadata.startTime.getTime()
            : 0;

        // Log response in development
        if (import.meta.env.DEV) {
            console.log('✅ API Response:', {
                method: response.config.method?.toUpperCase(),
                url: response.config.url,
                status: response.status,
                duration: `${duration}ms`,
                data: response.data,
            });
        }

        return response;
    },
    (error: AxiosError) => {
        // Calculate request duration if available
        const duration = error.config?.metadata?.startTime
            ? new Date().getTime() - error.config.metadata.startTime.getTime()
            : 'unknown';

        // Log error in development
        if (import.meta.env.DEV) {
            console.error('❌ API Error:', {
                method: error.config?.method?.toUpperCase(),
                url: error.config?.url,
                status: error.response?.status,
                duration: `${duration}ms`,
                message: error.message,
                data: error.response?.data,
            });
        }

        // Handle different error types
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden
                    console.error('Access forbidden');
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found');
                    break;
                case 500:
                    // Server error
                    console.error('Server error');
                    break;
                default:
                    console.error(`HTTP Error ${status}:`, data);
            }

            // Return structured error
            return Promise.reject({
                status,
                message: (data as any)?.message || error.message,
                data: data,
                isAxiosError: true,
            });
        } else if (error.request) {
            // Network error
            return Promise.reject({
                status: 0,
                message: 'Network error. Please check your connection.',
                data: null,
                isAxiosError: true,
            });
        } else {
            // Something else
            return Promise.reject({
                status: 0,
                message: error.message,
                data: null,
                isAxiosError: true,
            });
        }
    }
);

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
    interface AxiosRequestConfig {
        metadata?: {
            startTime?: Date;
        };
    }
}

// API client methods
export const api = {
    // GET request
    get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.get(url, config).then((response) => response.data),

    // POST request
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.post(url, data, config).then((response) => response.data),

    // PUT request
    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.put(url, data, config).then((response) => response.data),

    // PATCH request
    patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.patch(url, data, config).then((response) => response.data),

    // DELETE request
    delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
        apiClient.delete(url, config).then((response) => response.data),
};

export default api; 