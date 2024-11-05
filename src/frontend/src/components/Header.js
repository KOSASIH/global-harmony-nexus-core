import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>Advanced DApp</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/proposals">Proposals</Link>
                <Link to="/voting">Voting</Link>
            </nav>
        </header>
    );
};

export default Header;
