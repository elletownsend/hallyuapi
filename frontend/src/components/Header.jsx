import header from '../assets/img/header.png';

const Header = () => {
    return (
        <header className="header">
            <img className="header-img" src={header} alt="Title" />
            <p className="header-txt">The go-to API for data on all things Korean Wave!</p>
        </header>
    )
}

export default Header;
