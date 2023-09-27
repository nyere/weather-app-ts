import './PagePlaceholder.css';

const PagePlaceholder = () => {
    const conditions = [
        'clouds.svg',
        'sun_rain.svg',
        'thunder.svg',
        'cloud_sun.svg',
    ];

    return (
        <img
            className="placeholder__image"
            src={`/images/${
                conditions[Math.floor(Math.random() * conditions.length)]
            }`}
            alt="thunder-icon"
        ></img>
    );
};

export default PagePlaceholder;
