import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface WeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface WeatherConditionState {
    currentWeather: WeatherData;
    status: 'idle' | 'error' | 'loading' | 'data';
    error: string;
}

const initialState: WeatherConditionState = {
    currentWeather: {
        coord: { lon: 0, lat: 0 },
        weather: [],
        base: '',
        main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
            sea_level: 0,
            grnd_level: 0,
        },
        visibility: 0,
        wind: {
            speed: 0,
            deg: 0,
            gust: 0,
        },
        clouds: {
            all: 0,
        },
        dt: 0,
        sys: {
            type: 0,
            id: 0,
            country: '',
            sunrise: 0,
            sunset: 0,
        },
        timezone: 0,
        id: 0,
        name: '',
        cod: 0,
    },
    status: 'idle',
    error: '',
};

export const fetchConditions = createAsyncThunk(
    'weatherConditions/fetchConditions',
    async (
        {
            lat,
            lon,
            units,
        }: {
            lat: number;
            lon: number;
            units: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const fetchedData = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            );

            if (!fetchedData.ok) {
                const errorMessage = `Request failed with status: ${fetchedData.status} - ${fetchedData.statusText}`;
                throw new Error(errorMessage);
            }

            const jsonData = await fetchedData.json();
            return jsonData;
        } catch (error) {
            return rejectWithValue(`${error}`);
        }
    }
);

const weatherConditionsSlice = createSlice({
    name: 'weatherConditions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConditions.pending, (state) => {
                return { ...state, status: 'loading' };
            })
            .addCase(fetchConditions.fulfilled, (state, action) => {
                return {
                    ...state,
                    currentWeather: action.payload,
                    status: 'data',
                };
            })
            .addCase(fetchConditions.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });
    },
});

// selectors
export const selectConditions = (state: RootState) =>
    state.conditions.currentWeather;
export const selectActiveCoordinates = (state: RootState) =>
    state.conditions.currentWeather.coord;
export const selectWeatherConditionsStatus = (state: RootState) =>
    state.conditions.status;
export const selectWeatherConditionError = (state: RootState) =>
    state.conditions.error;

// reducer
export default weatherConditionsSlice.reducer;
