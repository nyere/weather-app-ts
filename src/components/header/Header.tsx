import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__title header__title--orange">
                    Simple Weather App
                </h1>
                <h2 className="header__subtitle header__subtitle--white">
                    Check your local weather, or take a look outside your window
                    😊
                </h2>
            </div>
        </header>
    );
};

export default Header;
