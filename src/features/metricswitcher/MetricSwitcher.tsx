import { switchUnits, selectUnits } from './MetricSwitcherSlice';
import {
    fetchConditions,
    selectActiveCoordinates,
} from '../weatherconditions/WeatherConditionsSlice';
import { fetchForecast } from '../weatherforecast/WeatherForecastSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './MetricSwitcher.css';

const MetricSwitcher = () => {
    const dispatch = useAppDispatch();
    const units = useAppSelector(selectUnits);
    const { lon, lat } = useAppSelector(selectActiveCoordinates);

    const handleClick = (status: string) => {
        if (status === 'metric' && units.metric) return;
        if (status === 'imperial' && units.imperial) return;
        dispatch(switchUnits());
        if (lon !== 0) {
            dispatch(fetchConditions({ lat, lon, units: status }));
            dispatch(fetchForecast({ lat, lon, units: status }));
        }
    };

    return (
        <div className="metric-switcher">
            <div className="metric-switcher__buttons">
                <button
                    className={`metric-switcher__option ${
                        units.metric
                            ? 'metric-switcher__option--active'
                            : 'metric-switcher__option--inactive'
                    }`}
                    onClick={() => handleClick('metric')}
                >
                    Metric: °C, m/s
                </button>
                <button
                    className={`metric-switcher__option ${
                        units.imperial
                            ? 'metric-switcher__option--active'
                            : 'metric-switcher__option--inactive'
                    }`}
                    onClick={() => handleClick('imperial')}
                >
                    Imperial: °F, mph
                </button>
            </div>
        </div>
    );
};

export default MetricSwitcher;
