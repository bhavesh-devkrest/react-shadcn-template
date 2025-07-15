import SEO from '../../components/seo/seo';

const ServicePage = () => {
    return (
        <>
            <SEO
                title="Our Services - Lekas Professional Solutions"
                description="Explore Lekas's comprehensive range of professional services designed to accelerate your business growth. From strategic consulting to implementation support, we deliver results that matter."
                keywords="lekas services, business consulting, professional services, strategic consulting, business solutions, consulting services, expert guidance"
                url="/service"
                type="website"
            />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-primary mb-6">Our Services</h1>
                <p className="text-lg text-muted-foreground">
                    Discover the services we offer to help you achieve your goals.
                </p>
            </div>
        </>
    );
};

export default ServicePage; 