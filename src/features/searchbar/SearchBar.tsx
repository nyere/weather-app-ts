import { ChangeEvent, useState } from 'react';
import './SearchBar.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    fetchCity,
    selectCities,
    selectSearchBarState,
} from './SearchBarSlice';
import MetricSwitcher from '../metricswitcher/MetricSwitcher';
import SearchResults from '../../components/searchresults/SearchResults';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const dispatch = useAppDispatch();
    const cities = useAppSelector(selectCities);
    const { status, error } = useAppSelector(selectSearchBarState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        dispatch(fetchCity(searchTerm));
    };

    return (
        <div className="search-page">
            <div className="search-page__container">
                <div className="search">
                    <input
                        className={`search-bar ${
                            status === 'failed'
                                ? 'search-bar__border--failed'
                                : ''
                        } ${cities.length > 0 ? 'search-bar__border' : ''}`}
                        type="text"
                        id="search"
                        placeholder="Search City"
                        value={searchTerm}
                        onChange={handleChange}
                    ></input>
                    {status === 'failed' && (
                        <ul className="search-results--failed">
                            <li className="search-results__result--failed">
                                {error}
                            </li>
                        </ul>
                    )}
                    {status === 'data' && <SearchResults />}
                    <button
                        className="search-bar__button"
                        disabled={!searchTerm}
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <MetricSwitcher />
            </div>
        </div>
    );
};

export default SearchBar;
