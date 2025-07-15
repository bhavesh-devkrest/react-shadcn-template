import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postService } from '../../api/services/posts';
import { queryKeys } from '../../lib/query-client/query-client';
import type { CreatePostRequest, QueryParams, UpdatePostRequest } from '../../types/api';

// Get all posts
export const usePosts = (params?: QueryParams) => {
    return useQuery({
        queryKey: [...queryKeys.posts(), { params }],
        queryFn: () => postService.getPosts(params),
        staleTime: 3 * 60 * 1000, // 3 minutes
    });
};

// Get single post by ID
export const usePost = (id: string) => {
    return useQuery({
        queryKey: queryKeys.post(id),
        queryFn: () => postService.getPost(id),
        enabled: !!id,
    });
};

// Get posts by user ID
export const usePostsByUser = (userId: string) => {
    return useQuery({
        queryKey: queryKeys.postsByUser(userId),
        queryFn: () => postService.getPostsByUser(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Create post mutation
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postData: CreatePostRequest) => postService.createPost(postData),
        onSuccess: (newPost) => {
            // Add new post to the posts list cache
            queryClient.setQueryData(queryKeys.post(newPost.id.toString()), newPost);

            // Invalidate posts lists
            queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
            queryClient.invalidateQueries({ queryKey: queryKeys.postsByUser(newPost.userId.toString()) });
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        },
    });
};

// Update post mutation
export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postData: UpdatePostRequest) => postService.updatePost(postData),
        onSuccess: (updatedPost) => {
            // Update the specific post in cache
            queryClient.setQueryData(queryKeys.post(updatedPost.id.toString()), updatedPost);

            // Invalidate posts lists
            queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
            queryClient.invalidateQueries({ queryKey: queryKeys.postsByUser(updatedPost.userId.toString()) });
        },
        onError: (error) => {
            console.error('Failed to update post:', error);
        },
    });
};

// Delete post mutation
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => postService.deletePost(id),
        onSuccess: (_, deletedPostId) => {
            // Remove post from cache
            queryClient.removeQueries({ queryKey: queryKeys.post(deletedPostId) });

            // Invalidate posts lists
            queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
        },
        onError: (error) => {
            console.error('Failed to delete post:', error);
        },
    });
}; 