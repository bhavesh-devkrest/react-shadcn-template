import SEO from '../../components/seo/seo';

const HomePage = () => {
    return (
        <>
            <SEO
                title="Lekas - Professional Services & Business Solutions"
                description="Transform your business with Lekas's expert professional services. We provide comprehensive business solutions, consulting, and strategic guidance to help your company achieve sustainable growth and success."
                keywords="lekas, professional services, business consulting, strategic planning, business solutions, corporate consulting, business growth, expert advice"
                url="/"
                type="website"
            />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-primary mb-6">Welcome to Lekas</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    This is the home page of your website. You can customize this content as needed.
                </p>

                {/* Inter Font Demo */}
                <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Inter Font Family Showcase
                    </h3>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Font Weights</h4>
                                <div className="space-y-2 text-sm">
                                    <p className="font-thin">Thin (100) - The quick brown fox</p>
                                    <p className="font-extralight">Extra Light (200) - The quick brown fox</p>
                                    <p className="font-light">Light (300) - The quick brown fox</p>
                                    <p className="font-normal">Normal (400) - The quick brown fox</p>
                                    <p className="font-medium">Medium (500) - The quick brown fox</p>
                                    <p className="font-semibold">Semi Bold (600) - The quick brown fox</p>
                                    <p className="font-bold">Bold (700) - The quick brown fox</p>
                                    <p className="font-extrabold">Extra Bold (800) - The quick brown fox</p>
                                    <p className="font-black">Black (900) - The quick brown fox</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Text Sizes</h4>
                                <div className="space-y-2">
                                    <p className="text-xs">Extra Small - Inter font family</p>
                                    <p className="text-sm">Small - Inter font family</p>
                                    <p className="text-base">Base - Inter font family</p>
                                    <p className="text-lg">Large - Inter font family</p>
                                    <p className="text-xl">Extra Large - Inter font family</p>
                                    <p className="text-2xl">2XL - Inter font family</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Sample Content</h4>
                            <div className="space-y-3">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Beautiful Typography with Inter</h1>
                                <p className="text-base text-gray-700 dark:text-gray-300">
                                    Inter is a typeface specially designed for user interfaces with focus on high legibility
                                    of small-to-medium sized text on computer screens. The family features a tall x-height
                                    to aid in readability of mixed-case and lower-case text.
                                </p>
                                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                                    This text demonstrates italic styling with Inter font family.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default HomePage; 