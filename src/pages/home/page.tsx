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


            </div>
        </>
    );
};

export default HomePage; 