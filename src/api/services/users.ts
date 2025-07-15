import type { CreateUserRequest, QueryParams, UpdateUserRequest, User } from '../../types/api';
import api from '../client';

export const userService = {
    // Get all users
    getUsers: async (params?: QueryParams): Promise<User[]> => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append('_page', params.page.toString());
        if (params?.limit) searchParams.append('_limit', params.limit.toString());
        if (params?.search) searchParams.append('q', params.search);

        const queryString = searchParams.toString();
        const url = queryString ? `/users?${queryString}` : '/users';

        return api.get<User[]>(url);
    },

    // Get user by ID
    getUser: async (id: string): Promise<User> => {
        return api.get<User>(`/users/${id}`);
    },

    // Create new user
    createUser: async (userData: CreateUserRequest): Promise<User> => {
        return api.post<User>('/users', userData);
    },

    // Update existing user
    updateUser: async (userData: UpdateUserRequest): Promise<User> => {
        const { id, ...updateData } = userData;
        return api.put<User>(`/users/${id}`, updateData);
    },

    // Partially update user
    patchUser: async (userData: UpdateUserRequest): Promise<User> => {
        const { id, ...updateData } = userData;
        return api.patch<User>(`/users/${id}`, updateData);
    },

    // Delete user
    deleteUser: async (id: string): Promise<void> => {
        return api.delete(`/users/${id}`);
    },

    // Get user profile (current user)
    getUserProfile: async (): Promise<User> => {
        return api.get<User>('/users/me');
    },
}; 