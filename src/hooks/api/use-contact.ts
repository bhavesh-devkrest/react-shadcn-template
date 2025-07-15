import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../../api/services/contact';
import { queryKeys } from '../../lib/query-client/query-client';
import type { ContactFormData } from '../../types/api';

// Submit contact form mutation
export const useSubmitContactForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: ContactFormData) => contactService.submitContactForm(formData),
        onSuccess: (response) => {
            // Invalidate contact submissions if admin is viewing them
            queryClient.invalidateQueries({ queryKey: queryKeys.contact() });

            console.log('Contact form submitted successfully:', response);
        },
        onError: (error) => {
            console.error('Failed to submit contact form:', error);
        },
    });
};

// Get all contact submissions (admin)
export const useContactSubmissions = () => {
    return useQuery({
        queryKey: queryKeys.contact(),
        queryFn: () => contactService.getContactSubmissions(),
        staleTime: 2 * 60 * 1000, // 2 minutes
        // Only enable if user has admin privileges
        enabled: false, // Enable this based on user role
    });
};

// Get single contact submission
export const useContactSubmission = (id: string) => {
    return useQuery({
        queryKey: [...queryKeys.contact(), id],
        queryFn: () => contactService.getContactSubmission(id),
        enabled: !!id,
    });
};

// Update contact status mutation
export const useUpdateContactStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: 'pending' | 'responded' | 'closed' }) =>
            contactService.updateContactStatus(id, status),
        onSuccess: (updatedContact) => {
            // Update the specific contact in cache
            queryClient.setQueryData([...queryKeys.contact(), updatedContact.id.toString()], updatedContact);

            // Invalidate contact submissions list
            queryClient.invalidateQueries({ queryKey: queryKeys.contact() });
        },
        onError: (error) => {
            console.error('Failed to update contact status:', error);
        },
    });
}; 