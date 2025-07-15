import { Helmet } from 'react-helmet-async';
import { useTitle } from '../../hooks/use-title';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

const SEO = ({
    title = 'Lekas - Professional Services',
    description = 'Lekas provides exceptional professional services to help your business grow and succeed. Contact us today to learn more about our comprehensive solutions.',
    keywords = 'lekas, professional services, business solutions, consulting, expertise',
    image = '/og-image.jpg',
    url = '',
    type = 'website',
    author = 'Lekas Team',
    publishedTime,
    modifiedTime,
}: SEOProps) => {
    const siteUrl = 'https://lekas.com'; // Replace with your actual domain
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    // Use the custom hook for reliable title updates
    useTitle(title);

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Lekas" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImageUrl} />
            <meta property="twitter:creator" content="@lekas" />
            <meta property="twitter:site" content="@lekas" />

            {/* Article specific meta tags */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}

            {/* Additional SEO Meta Tags */}
            <meta name="theme-color" content="#6122A3" />
            <meta name="msapplication-TileColor" content="#6122A3" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Lekas" />
            <meta name="format-detection" content="telephone=no" />

            {/* Schema.org structured data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Lekas",
                    "url": siteUrl,
                    "logo": `${siteUrl}/logo.png`,
                    "description": description,
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+1-XXX-XXX-XXXX",
                        "contactType": "customer service"
                    },
                    "sameAs": [
                        "https://facebook.com/lekas",
                        "https://twitter.com/lekas",
                        "https://linkedin.com/company/lekas"
                    ]
                })}
            </script>
        </Helmet>
    );
};

export default SEO; 