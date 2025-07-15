import SEO from '../../components/seo/seo';

const ContactPage = () => {
    return (
        <>
            <SEO
                title="Contact Us - Lekas Professional Services"
                description="Get in touch with Lekas for expert professional services and business consulting. Contact our team today to discuss how we can help your business achieve its goals and drive sustainable growth."
                keywords="contact lekas, business inquiry, professional consultation, get in touch, business contact, consulting inquiry"
                url="/contact"
                type="website"
            />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-primary mb-6">Contact Us</h1>
                <p className="text-lg text-muted-foreground">
                    Get in touch with us for any questions or inquiries.
                </p>
            </div>
        </>
    );
};

export default ContactPage; 