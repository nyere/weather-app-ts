import Header from './components/header/Header';
import SearchBar from './features/searchbar/SearchBar';
import WeatherConditions from './features/weatherconditions/WeatherConditions';
import WeatherForecast from './features/weatherforecast/WeatherForecast';
import PagePlaceholder from './components/page-placeholder/PagePlaceholder';
import { selectWeatherConditionsStatus } from './features/weatherconditions/WeatherConditionsSlice';
import { selectForecastStatus } from './features/weatherforecast/WeatherForecastSlice';
import { useAppSelector } from './app/hooks';
import './App.css';

function App() {
    const weatherStatus = useAppSelector(selectWeatherConditionsStatus);
    const forecastStatus = useAppSelector(selectForecastStatus);
    return (
        <>
            <Header />
            <SearchBar />
            <div className="weather-data">
                {weatherStatus !== 'idle' && <WeatherConditions />}
                {forecastStatus !== 'idle' && <WeatherForecast />}
                {weatherStatus === 'idle' && forecastStatus === 'idle' && (
                    <PagePlaceholder />
                )}
            </div>
        </>
    );
}

export default App;
