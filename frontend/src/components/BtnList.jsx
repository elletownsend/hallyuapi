import { Link } from 'react-router-dom';

const BtnList = () => {
    return (
        <div className="btnList">
            <Link to="https://github.com/elletownsend/hallyuapi" className="btn1">
                Show Me The Code
            </Link>
            <Link to={'/docs'} className="btn2">
                Read The Docs
            </Link>
            <Link to="https://github.com/elletownsend/hallyuapi" className="btn3">
                Contribute
            </Link>
        </div>
    )
}

export default BtnList;