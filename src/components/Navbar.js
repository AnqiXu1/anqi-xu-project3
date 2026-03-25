import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand"><span>SUDOKU</span>PROJECT</Link>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/games">Selection</Link></li>
                <li><Link to="/games/normal">Hard Game</Link></li>
                <li><Link to="/games/easy">Easy Game</Link></li>
                <li><Link to="/rules">Rules</Link></li>
                <li><Link to="/scores">Scores</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;