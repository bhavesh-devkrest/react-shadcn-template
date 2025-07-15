// Base API response types
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
}

export interface ApiError {
    status: number;
    message: string;
    data?: any;
    isAxiosError: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

// User types
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface CreateUserRequest {
    name: string;
    username: string;
    email: string;
    phone?: string;
    website?: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
    id: number;
}

// Post types
export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface CreatePostRequest {
    title: string;
    body: string;
    userId: number;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
    id: number;
}

// Service types
export interface Service {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    features: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateServiceRequest {
    title: string;
    description: string;
    price: number;
    category: string;
    features: string[];
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
    id: number;
    isActive?: boolean;
}

// Contact types
export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
    company?: string;
}

export interface ContactResponse {
    id: number;
    status: 'pending' | 'responded' | 'closed';
    submittedAt: string;
}

// Query parameters
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface FilterParams {
    search?: string;
    category?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
}

export type QueryParams = PaginationParams & FilterParams; 