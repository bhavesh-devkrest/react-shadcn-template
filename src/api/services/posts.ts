import type { CreatePostRequest, Post, QueryParams, UpdatePostRequest } from '../../types/api';
import api from '../client';

export const postService = {
    // Get all posts
    getPosts: async (params?: QueryParams): Promise<Post[]> => {
        const searchParams = new URLSearchParams();

        if (params?.page) searchParams.append('_page', params.page.toString());
        if (params?.limit) searchParams.append('_limit', params.limit.toString());
        if (params?.search) searchParams.append('q', params.search);

        const queryString = searchParams.toString();
        const url = queryString ? `/posts?${queryString}` : '/posts';

        return api.get<Post[]>(url);
    },

    // Get post by ID
    getPost: async (id: string): Promise<Post> => {
        return api.get<Post>(`/posts/${id}`);
    },

    // Get posts by user ID
    getPostsByUser: async (userId: string): Promise<Post[]> => {
        return api.get<Post[]>(`/posts?userId=${userId}`);
    },

    // Create new post
    createPost: async (postData: CreatePostRequest): Promise<Post> => {
        return api.post<Post>('/posts', postData);
    },

    // Update existing post
    updatePost: async (postData: UpdatePostRequest): Promise<Post> => {
        const { id, ...updateData } = postData;
        return api.put<Post>(`/posts/${id}`, updateData);
    },

    // Delete post
    deletePost: async (id: string): Promise<void> => {
        return api.delete(`/posts/${id}`);
    },
}; 