import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface ForecastData {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: { all: number };
    wind: { speed: number; deg: number; gust: number };
    visibility: number;
    pop: number;
    sys: { pod: string };
    dt_txt: string;
}

interface Forecast {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastData[];
    city: {
        id: number;
        name: string;
        coord: { lat: number; lon: number };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

export interface WeatherForecastState {
    forecastData: Forecast;
    status: 'idle' | 'loading' | 'data' | 'error';
    error: string;
}

const initialState: WeatherForecastState = {
    forecastData: {
        cod: '200',
        message: 0,
        cnt: 1,
        list: [
            {
                dt: 1695567600,
                main: {
                    temp: 299.12,
                    feels_like: 299.12,
                    temp_min: 298.69,
                    temp_max: 299.12,
                    pressure: 1015,
                    sea_level: 1015,
                    grnd_level: 950,
                    humidity: 48,
                    temp_kf: 0.43,
                },
                weather: [
                    {
                        id: 803,
                        main: 'Clouds',
                        description: 'broken clouds',
                        icon: '04d',
                    },
                ],
                clouds: { all: 59 },
                wind: { speed: 4.37, deg: 74, gust: 8.33 },
                visibility: 10000,
                pop: 0.38,
                sys: { pod: 'd' },
                dt_txt: '2023-09-24 15:00:00',
            },
        ],
        city: {
            id: 729968,
            name: 'Krasno Selo',
            coord: { lat: 42.69, lon: 23.32 },
            country: 'BG',
            population: 0,
            timezone: 10800,
            sunrise: 1695528934,
            sunset: 1695572537,
        },
    },
    status: 'idle',
    error: '',
};

export const fetchForecast = createAsyncThunk(
    'forecast/fetchForecast',
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
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
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

const weatherForecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {
                return { ...state, status: 'loading' };
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                return {
                    ...state,
                    forecastData: action.payload,
                    status: 'data',
                };
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload as string;
            });
    },
});

// selectors
export const selectForecast = (state: RootState) => state.forecast.forecastData;
export const selectForecastStatus = (state: RootState) => state.forecast.status;
export const selectForecastError = (state: RootState) => state.forecast.error;

// reducer
export default weatherForecastSlice.reducer;
