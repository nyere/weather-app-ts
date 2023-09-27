import './WeatherConditions.css';
import { useAppSelector } from '../../app/hooks';
import {
    selectConditions,
    selectWeatherConditionsStatus,
    selectWeatherConditionError,
} from './WeatherConditionsSlice';
import { selectActiveUnit } from '../metricswitcher/MetricSwitcherSlice';
import unixTimestampToHumanReadable from '../../utils/unixTimestampDecoder';
import ErrorBox from '../../components/errorbox/ErrorBox';

const WeatherConditions = () => {
    const weatherConditions = useAppSelector(selectConditions);
    const weatherConditionsStatus = useAppSelector(
        selectWeatherConditionsStatus
    );
    const activeUnit = useAppSelector(selectActiveUnit);
    const errorMessage = useAppSelector(selectWeatherConditionError);

    if (weatherConditionsStatus === 'loading') {
        return (
            <div className="weather-conditions">
                <div className="weather-conditions__header">Loading...</div>
            </div>
        );
    }

    if (weatherConditionsStatus === 'error') {
        return <ErrorBox errorMessage={errorMessage} />;
    }

    return (
        <div className="weather-conditions">
            <div className="weather-conditions__header">
                <span className="weather-conditions__date-time">
                    {unixTimestampToHumanReadable(weatherConditions.dt)}
                </span>
            </div>
            <div className="weather-conditions__body">
                <div>
                    <h2 className="weather-conditions__title">
                        {weatherConditions.name},{' '}
                        {weatherConditions.sys.country}
                    </h2>
                    <div className="weather-conditions__info">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherConditions.weather[0]?.icon}.png`}
                            alt="weather-icon"
                        />
                        <span className="weather-conditions__temperature">
                            {Math.trunc(weatherConditions.main.temp)}°
                            {activeUnit === 'metric' ? 'C' : 'F'}
                        </span>
                    </div>
                    <div className="weather-conditions__description">
                        Feels like{' '}
                        {Math.trunc(weatherConditions.main.feels_like)}°
                        {activeUnit === 'metric' ? 'C' : 'F'}.{' '}
                        {weatherConditions.weather[0]?.description[0].toUpperCase() +
                            weatherConditions.weather[0]?.description.slice(1)}
                        .
                    </div>
                </div>
                <div>
                    <ul className="weather-conditions__list">
                        <li className="weather-conditions__item">
                            Wind: {weatherConditions.wind.speed}
                            {activeUnit === 'metric' ? 'm/s' : 'mph'}
                        </li>
                        <li className="weather-conditions__item">
                            Pressure: {weatherConditions.main.pressure}hPa
                        </li>
                        <li className="weather-conditions__item">
                            Humidity: {weatherConditions.main.humidity}%
                        </li>
                        <li className="weather-conditions__item">
                            Visibility: {weatherConditions.visibility / 1000}km
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WeatherConditions;
