import { Link } from 'react-router-dom';

import lettermrk from '../assets/img/lettermark.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to={'/'} className="nav-logo">
                        <img src={lettermrk} alt="Hallyu API" />
                    </Link>
                </li>
                <li><Link to={'/'} className="nav-link">Home</Link></li>
                <li><Link to={'/about'} className="nav-link">About</Link></li>
                <li><Link to={'/docs'} className="nav-link link-main">Documentation</Link></li>
            </ul>
        </nav>
    )
};

export default Navbar;
