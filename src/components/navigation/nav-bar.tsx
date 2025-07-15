import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    const navItems = [
        { label: 'HOME', path: '/' },
        { label: 'ABOUT US', path: '/about-us' },
        { label: 'SERVICE', path: '/service' },
        { label: 'CONTACT', path: '/contact' },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-background border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center h-16">
                    <ul className="flex space-x-8">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.path)
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar; 