import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    selectCities,
    clearResults,
} from '../../features/searchbar/SearchBarSlice';
import { fetchConditions } from '../../features/weatherconditions/WeatherConditionsSlice';
import { selectActiveUnit } from '../../features/metricswitcher/MetricSwitcherSlice';
import { fetchForecast } from '../../features/weatherforecast/WeatherForecastSlice';
import './SearchResults.css';

const SearchResults = () => {
    const dispatch = useAppDispatch();
    const cities = useAppSelector(selectCities);
    const activeUnit = useAppSelector(selectActiveUnit);

    const submitSearch = ({
        lat,
        lon,
        units,
    }: {
        lat: number;
        lon: number;
        units: string;
    }) => {
        dispatch(fetchConditions({ lat, lon, units }));
        dispatch(fetchForecast({ lat, lon, units }));
        dispatch(clearResults());
    };

    if (cities.length > 0) {
        return (
            <ul className="search-results">
                {cities.map((location) => {
                    return (
                        <li
                            key={location.coordinates.lat}
                            className="search-result"
                            onClick={() =>
                                submitSearch({
                                    lat: location.coordinates.lat,
                                    lon: location.coordinates.lon,
                                    units: activeUnit,
                                })
                            }
                        >
                            <div>
                                {location.name}, {location.country}
                            </div>
                            <div className="search-result__coordinates">
                                {location.coordinates.lat},{' '}
                                {location.coordinates.lon}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
    return <div></div>;
};

export default SearchResults;
