import { appConfig } from '../App';

/**
 * Custom hook to access application configuration
 * This provides easy access to all app settings, feature flags, and metadata
 */
export const useAppConfig = () => {
    return {
        // Base configuration
        base: appConfig.base,

        // Global settings
        global: appConfig.global,

        // Performance settings
        performance: appConfig.performance,

        // Security settings
        security: appConfig.security,

        // Analytics configuration
        analytics: appConfig.analytics,

        // Internationalization
        i18n: appConfig.i18n,

        // Environment flags
        environment: appConfig.environment,

        // Feature flags
        features: appConfig.features,

        // App metadata
        metadata: appConfig.metadata,

        // Schema.org data
        schema: appConfig.schema,

        // Utility functions
        utils: {
            // Check if analytics should be enabled
            shouldLoadAnalytics: () =>
                appConfig.analytics.ga4.enabled ||
                appConfig.analytics.facebook.enabled ||
                appConfig.analytics.hotjar.enabled,

            // Get current environment
            getEnvironment: () =>
                appConfig.environment.isDevelopment ? 'development' : 'production',

            // Check if feature is enabled
            isFeatureEnabled: (feature: keyof typeof appConfig.features) =>
                appConfig.features[feature],

            // Get current version info
            getVersionInfo: () => ({
                version: appConfig.metadata.version,
                buildDate: appConfig.metadata.buildDate,
                commit: appConfig.metadata.commit,
                branch: appConfig.metadata.branch,
            }),

            // Get SEO metadata
            getSEOData: () => ({
                title: appConfig.base.title,
                titleTemplate: appConfig.base.titleTemplate,
                defaultTitle: appConfig.base.defaultTitle,
                organizationSchema: appConfig.schema.organization,
                websiteSchema: appConfig.schema.website,
            }),

            // Get performance hints
            getPerformanceHints: () => ({
                preload: appConfig.performance.preload,
                prefetch: appConfig.performance.prefetch,
                dnsPrefetch: appConfig.performance.dnsPrefetch,
            }),

            // Get security headers
            getSecurityHeaders: () => ({
                csp: appConfig.security.contentSecurityPolicy,
                headers: appConfig.security.headers,
            }),

            // Get analytics config for a specific provider
            getAnalyticsConfig: (provider: 'ga4' | 'facebook' | 'hotjar') =>
                appConfig.analytics[provider],

            // Check if in development mode
            isDevelopment: () => appConfig.environment.isDevelopment,

            // Check if in production mode
            isProduction: () => appConfig.environment.isProduction,

            // Get API base URL
            getApiBaseUrl: () => appConfig.environment.apiBaseUrl,

            // Get supported languages
            getSupportedLanguages: () => appConfig.i18n.supportedLanguages,

            // Get default language
            getDefaultLanguage: () => appConfig.i18n.defaultLanguage,
        }
    };
};

// Type definitions for the configuration
export type AppConfig = typeof appConfig;
export type FeatureFlag = keyof typeof appConfig.features;
export type AnalyticsProvider = keyof typeof appConfig.analytics;
export type Environment = 'development' | 'production';

// Export individual sections for specific use cases
export const useFeatureFlags = () => appConfig.features;
export const useEnvironment = () => appConfig.environment;
export const useAnalyticsConfig = () => appConfig.analytics;
export const useI18nConfig = () => appConfig.i18n;
export const usePerformanceConfig = () => appConfig.performance;
export const useSecurityConfig = () => appConfig.security;
export const useMetadata = () => appConfig.metadata;
export const useSchemaData = () => appConfig.schema; 