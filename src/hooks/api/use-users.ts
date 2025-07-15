import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../api/services/users';
import { queryKeys } from '../../lib/query-client/query-client';
import type { CreateUserRequest, QueryParams, UpdateUserRequest, User } from '../../types/api';

// Get all users
export const useUsers = (params?: QueryParams) => {
    return useQuery({
        queryKey: [...queryKeys.users(), { params }],
        queryFn: () => userService.getUsers(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Get single user by ID
export const useUser = (id: string) => {
    return useQuery({
        queryKey: queryKeys.user(id),
        queryFn: () => userService.getUser(id),
        enabled: !!id, // Only run if id exists
    });
};

// Get current user profile
export const useUserProfile = () => {
    return useQuery({
        queryKey: queryKeys.userProfile(),
        queryFn: () => userService.getUserProfile(),
        staleTime: 10 * 60 * 1000, // 10 minutes for profile data
    });
};

// Create user mutation
export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: CreateUserRequest) => userService.createUser(userData),
        onSuccess: (newUser) => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: queryKeys.users() });

            // Optionally add the new user to the cache
            queryClient.setQueryData(queryKeys.user(newUser.id.toString()), newUser);
        },
        onError: (error) => {
            console.error('Failed to create user:', error);
        },
    });
};

// Update user mutation
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: UpdateUserRequest) => userService.updateUser(userData),
        onSuccess: (updatedUser) => {
            // Update the specific user in cache
            queryClient.setQueryData(queryKeys.user(updatedUser.id.toString()), updatedUser);

            // Invalidate users list to refetch
            queryClient.invalidateQueries({ queryKey: queryKeys.users() });
        },
        onError: (error) => {
            console.error('Failed to update user:', error);
        },
    });
};

// Delete user mutation
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => userService.deleteUser(id),
        onSuccess: (_, deletedUserId) => {
            // Remove user from cache
            queryClient.removeQueries({ queryKey: queryKeys.user(deletedUserId) });

            // Invalidate users list to refetch
            queryClient.invalidateQueries({ queryKey: queryKeys.users() });
        },
        onError: (error) => {
            console.error('Failed to delete user:', error);
        },
    });
};

// Optimistic update user mutation
export const useOptimisticUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: UpdateUserRequest) => userService.updateUser(userData),
        onMutate: async (newUserData) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.user(newUserData.id.toString()) });

            // Snapshot the previous value
            const previousUser = queryClient.getQueryData<User>(queryKeys.user(newUserData.id.toString()));

            // Optimistically update to the new value
            if (previousUser) {
                queryClient.setQueryData(queryKeys.user(newUserData.id.toString()), {
                    ...previousUser,
                    ...newUserData,
                });
            }

            // Return a context object with the snapshotted value
            return { previousUser };
        },
        onError: (err, newUserData, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousUser) {
                queryClient.setQueryData(queryKeys.user(newUserData.id.toString()), context.previousUser);
            }
        },
        onSettled: (data, error, variables) => {
            // Always refetch after error or success
            queryClient.invalidateQueries({ queryKey: queryKeys.user(variables.id.toString()) });
        },
    });
}; 