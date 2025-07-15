export const seoConfig = {
    // Site information
    siteName: 'Lekas',
    siteUrl: 'https://lekas.com', // Replace with your actual domain
    defaultTitle: 'Lekas - Professional Services',
    titleTemplate: '%s | Lekas',
    defaultDescription: 'Lekas provides exceptional professional services to help your business grow and succeed. Contact us today to learn more about our comprehensive solutions.',

    // Default meta tags
    defaultKeywords: 'lekas, professional services, business solutions, consulting, expertise',
    defaultAuthor: 'Lekas Team',
    defaultImage: '/og-image.jpg',

    // Social media
    social: {
        twitter: '@lekas',
        facebook: 'https://facebook.com/lekas',
        linkedin: 'https://linkedin.com/company/lekas',
        instagram: 'https://instagram.com/lekas',
    },

    // Organization schema
    organization: {
        name: 'Lekas',
        legalName: 'Lekas Professional Services',
        description: 'Professional services and business consulting company',
        logo: '/logo.png',
        telephone: '+1-XXX-XXX-XXXX',
        email: 'contact@lekas.com',
        address: {
            streetAddress: '123 Business St',
            addressLocality: 'City',
            addressRegion: 'State',
            postalCode: '12345',
            addressCountry: 'US'
        }
    },

    // Analytics
    analytics: {
        googleAnalyticsId: 'GA_MEASUREMENT_ID', // Replace with your GA4 ID
        facebookPixelId: 'FB_PIXEL_ID', // Replace with your Facebook Pixel ID
    },

    // Features
    features: {
        enableAnalytics: false, // Set to true when you have analytics IDs
        enableStructuredData: true,
        enableOpenGraph: true,
        enableTwitterCards: true,
    }
};

export type SEOConfig = typeof seoConfig; 