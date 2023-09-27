import './WeatherForecast.css';
import { useEffect, useState } from 'react';
import {
    selectForecast,
    selectForecastStatus,
    selectForecastError,
} from './WeatherForecastSlice';
import { useAppSelector } from '../../app/hooks';
import { selectActiveUnit } from '../metricswitcher/MetricSwitcherSlice';
import unixTimestampToHumanReadable from '../../utils/unixTimestampDecoder';
import ErrorBox from '../../components/errorbox/ErrorBox';

const WeatherForecast = () => {
    const [listIndex, setListIndex] = useState(0);
    const forecast = useAppSelector(selectForecast);
    const forecastStatus = useAppSelector(selectForecastStatus);
    const activeUnit = useAppSelector(selectActiveUnit);
    const errorMessage = useAppSelector(selectForecastError);

    // reset the listIndex when forecast content changes
    useEffect(() => {
        setListIndex(0);
    }, [forecast]);

    const handleClick = (direction: string) => {
        if (direction === 'left') {
            if (listIndex === 0) return;
            setListIndex((listIndex) => listIndex - 1);
        }
        if (direction === 'right') {
            if (listIndex === forecast.list.length + 1) return;
            setListIndex((listIndex) => listIndex + 1);
        }
    };

    if (forecastStatus === 'loading') {
        return (
            <div className="weather-forecast">
                <div className="weather-forecast__header">Loading...</div>
            </div>
        );
    }

    if (forecastStatus === 'error') {
        return <ErrorBox errorMessage={errorMessage} />;
    }

    return (
        <div className="weather-forecast">
            <div className="weather-forecast__header">
                <span className="weather-forecast__date-time">
                    Forecast for{' '}
                    {unixTimestampToHumanReadable(forecast.list[listIndex].dt)}
                </span>
            </div>
            <div className="weather-forecast__body">
                <div>
                    <h2 className="weather-forecast__title">
                        {forecast.city.name}, {forecast.city.country}
                    </h2>
                    <div className="weather-forecast__info">
                        <img
                            src={`https://openweathermap.org/img/wn/${forecast.list[listIndex].weather[0].icon}.png`}
                            alt="weather-icon"
                        />
                        {
                            <span className="weather-forecast__temperature">
                                {Math.trunc(forecast.list[listIndex].main.temp)}
                                °{activeUnit === 'metric' ? 'C' : 'F'}
                            </span>
                        }
                    </div>
                    <div className="weather-forecast__description">
                        It will feel like{' '}
                        {Math.trunc(forecast.list[listIndex].main.feels_like)}°
                        {activeUnit === 'metric' ? 'C' : 'F'}.{' '}
                        {forecast.list[
                            listIndex
                        ].weather[0]?.description[0].toUpperCase() +
                            forecast.list[
                                listIndex
                            ].weather[0]?.description.slice(1)}
                        .
                    </div>
                </div>
                <div>
                    <ul className="weather-forecast__list">
                        <li className="weather-forecast__item">
                            Wind: {forecast.list[listIndex].wind.speed}
                            {activeUnit === 'metric' ? 'm/s' : 'mph'}
                        </li>
                        <li className="weather-forecast__item">
                            Pressure: {forecast.list[listIndex].main.pressure}
                            hPa
                        </li>
                        <li className="weather-forecast__item">
                            Humidity: {forecast.list[listIndex].main.humidity}%
                        </li>
                        <li className="weather-forecast__item">
                            Visibility:{' '}
                            {forecast.list[listIndex].visibility / 1000}
                            km
                        </li>
                    </ul>
                </div>
            </div>
            <button
                className="weather-forecast__button weather-forecast__button--left"
                onClick={() => handleClick('left')}
                disabled={listIndex === 0}
            >
                ←
            </button>
            <button
                className="weather-forecast__button weather-forecast__button--right"
                onClick={() => handleClick('right')}
                disabled={listIndex === forecast.list.length - 1}
            >
                →
            </button>
        </div>
    );
};

export default WeatherForecast;
