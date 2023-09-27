import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchBarReducer from '../features/searchbar/SearchBarSlice';
import MetricSwitcherReducer from '../features/metricswitcher/MetricSwitcherSlice';
import WeatherConditionsReducer from '../features/weatherconditions/WeatherConditionsSlice';
import weatherForecastReducer from '../features/weatherforecast/WeatherForecastSlice';

export const store = configureStore({
    reducer: {
        searchBar: searchBarReducer,
        units: MetricSwitcherReducer,
        conditions: WeatherConditionsReducer,
        forecast: weatherForecastReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
