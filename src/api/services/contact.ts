import type { ContactFormData, ContactResponse } from '../../types/api';
import api from '../client';

export const contactService = {
    // Submit contact form
    submitContactForm: async (formData: ContactFormData): Promise<ContactResponse> => {
        return api.post<ContactResponse>('/contact', formData);
    },

    // Get contact submissions (admin only)
    getContactSubmissions: async (): Promise<ContactResponse[]> => {
        return api.get<ContactResponse[]>('/contact/submissions');
    },

    // Get contact submission by ID
    getContactSubmission: async (id: string): Promise<ContactResponse> => {
        return api.get<ContactResponse>(`/contact/${id}`);
    },

    // Update contact submission status
    updateContactStatus: async (id: string, status: 'pending' | 'responded' | 'closed'): Promise<ContactResponse> => {
        return api.patch<ContactResponse>(`/contact/${id}`, { status });
    },
}; 