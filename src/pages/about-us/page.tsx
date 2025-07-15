import SEO from '../../components/seo/seo';

const AboutUsPage = () => {
    return (
        <>
            <SEO
                title="About Us - Lekas Professional Services"
                description="Learn about Lekas's journey, mission, and values. Discover how our experienced team of professionals helps businesses achieve their goals through innovative solutions and expert guidance."
                keywords="about lekas, company history, mission, values, professional team, business expertise, company culture"
                url="/about-us"
                type="website"
            />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-primary mb-6">About Us</h1>
                <p className="text-lg text-muted-foreground">
                    Learn more about our company, mission, and values.
                </p>
            </div>
        </>
    );
};

export default AboutUsPage; 