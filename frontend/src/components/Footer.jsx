import { Link } from 'react-router-dom';

import twitter from '../assets/img/twitter-glow.png';
import github from '../assets/img/github-glow.png';

const Footer = () => {
    return (
        <footer>
            <Link to="https://twitter.com/_elletownsend">
                <img src={twitter} alt="Twitter" />
            </Link>
            <p>Created by <span>Elle Townsend</span></p>
            <Link to="https://github.com/elletownsend/hallyuapi">
                <img src={github} alt="Github" />
            </Link>
        </footer>
    )
}

export default Footer;
