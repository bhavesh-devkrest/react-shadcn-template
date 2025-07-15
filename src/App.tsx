
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary/error-boundary';
import { queryClient } from './lib/query-client/query-client';
import { router } from './routes/router';

// Create helmet context for SSR support (simple and correctly typed)
const helmetContext = {};

// Application configuration object
export const appConfig = {
  // Base configuration for all pages
  base: {
    title: 'Lekas - Professional Services',
    titleTemplate: '%s | Lekas',
    defaultTitle: 'Lekas - Professional Services',
  },

  // Global meta tags that apply to all pages
  global: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#6122A3' },
      { name: 'msapplication-TileColor', content: '#6122A3' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'generator', content: 'Vite + React + TypeScript' },
      { name: 'application-name', content: 'Lekas' },
      { name: 'apple-mobile-web-app-title', content: 'Lekas' },
      { name: 'msapplication-tooltip', content: 'Professional Services' },
      { name: 'msapplication-starturl', content: '/' },
      { name: 'msapplication-task', content: 'name=Home;action-uri=/;icon-uri=/favicon.ico' },
      { name: 'msapplication-task', content: 'name=About;action-uri=/about-us;icon-uri=/favicon.ico' },
      { name: 'msapplication-task', content: 'name=Services;action-uri=/service;icon-uri=/favicon.ico' },
      { name: 'msapplication-task', content: 'name=Contact;action-uri=/contact;icon-uri=/favicon.ico' },
    ],

    // Global links
    link: [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#6122A3' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'alternate', type: 'application/rss+xml', title: 'Lekas RSS Feed', href: '/rss.xml' },
      { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
    ],
  },

  // Performance and optimization settings
  performance: {
    // Preload critical resources
    preload: [
      { href: '/fonts/primary-font.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { href: '/css/critical.css', as: 'style' },
    ],

    // Resource hints
    prefetch: [
      { href: '/api/users', as: 'fetch', crossOrigin: 'anonymous' },
      { href: '/images/hero-background.webp', as: 'image' },
    ],

    // DNS prefetch for external domains
    dnsPrefetch: [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//www.google-analytics.com',
      '//www.googletagmanager.com',
    ]
  },

  // Security headers and policies
  security: {
    contentSecurityPolicy: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'img-src': ["'self'", 'data:', 'https:'],
      'connect-src': ["'self'", 'https://api.lekas.com'],
    },

    // Other security headers
    headers: [
      { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'" },
      { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
      { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
      { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
      { 'http-equiv': 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
      { 'http-equiv': 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=()' },
    ]
  },

  // Analytics and tracking configuration
  analytics: {
    // Google Analytics 4
    ga4: {
      measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
      enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
      config: {
        anonymize_ip: true,
        cookie_expires: 365 * 24 * 60 * 60, // 1 year
        custom_map: {
          'custom_parameter': 'dimension1'
        }
      }
    },

    // Facebook Pixel
    facebook: {
      pixelId: import.meta.env.VITE_FB_PIXEL_ID,
      enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    },

    // Other analytics
    hotjar: {
      id: import.meta.env.VITE_HOTJAR_ID,
      enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    }
  },

  // Internationalization settings
  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr'],
    direction: 'ltr',
    locale: 'en-US',
    timeZone: 'America/New_York',
  },

  // Development vs Production configurations
  environment: {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
  },

  // Feature flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enablePWA: true,
    enableServiceWorker: import.meta.env.PROD,
    enableOfflineMode: true,
    enableNotifications: true,
    enableChat: false,
    enableA11y: true,
  },

  // Custom metadata for the app
  metadata: {
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    buildDate: new Date().toISOString(),
    commit: import.meta.env.VITE_GIT_COMMIT || 'unknown',
    branch: import.meta.env.VITE_GIT_BRANCH || 'main',
  },

  // Schema.org structured data
  schema: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Lekas',
      url: 'https://lekas.com',
      logo: 'https://lekas.com/logo.png',
      description: 'Professional services and business consulting company',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-XXX-XXX-XXXX',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English']
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Business St',
        addressLocality: 'City',
        addressRegion: 'State',
        postalCode: '12345',
        addressCountry: 'US'
      },
      sameAs: [
        'https://facebook.com/lekas',
        'https://twitter.com/lekas',
        'https://linkedin.com/company/lekas',
        'https://instagram.com/lekas'
      ],
      foundingDate: '2020',
      numberOfEmployees: '10-50',
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '40.7128',
          longitude: '-74.0060'
        },
        geoRadius: '100 miles'
      }
    },

    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Lekas',
      url: 'https://lekas.com',
      description: 'Professional services and business solutions',
      inLanguage: 'en-US',
      copyrightYear: new Date().getFullYear(),
      copyrightHolder: {
        '@type': 'Organization',
        name: 'Lekas'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://lekas.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  }
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider context={helmetContext}>
          <RouterProvider router={router} />
          {/* React Query DevTools - only shows in development */}
          {appConfig.environment.enableDevTools && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
