import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <Link to="/" className="header_logo">
                        FACEIT <span>Revolution</span>
                    </Link>
                    <nav className={`header_nav ${isOpen ? 'open' : ''}`}>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="https://github.com/fubrzzik/faceit-revolution" target="_blank" rel="noopener noreferrer">GitHub</Link></li>
                        </ul>
                    </nav>
                    <div className={`header_nav_collapse ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header