import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SearchBarState {
    cities: {
        name: string;
        country: string;
        coordinates: { lat: number; lon: number };
    }[];
    status: 'empty' | 'data' | 'loading' | 'failed';
    error: string;
}

const initialState: SearchBarState = {
    cities: [],
    status: 'empty',
    error: '',
};

export const fetchCity = createAsyncThunk(
    'searchBar/fetchCity',
    async (city: string, { rejectWithValue }) => {
        const fetchedData = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        const jsonData = await fetchedData.json();
        // the API does not provide different error code or messages. Error handling is done via checking jsonData.length
        if (jsonData.length === 0) {
            return rejectWithValue(
                "Entered city couldn't be found. Try again."
            );
        }
        return jsonData;
    }
);

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState,
    reducers: {
        clearResults: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCity.fulfilled, (state, action) => {
                state.status = 'data';
                state.cities = action.payload.map((entry: any) => {
                    return {
                        name: entry.name,
                        country: entry.country,
                        coordinates: {
                            lat: entry.lat,
                            lon: entry.lon,
                        },
                    };
                });
            })
            .addCase(fetchCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

// actions
export const { clearResults } = searchBarSlice.actions;

// selectors
export const selectCities = (state: RootState) => state.searchBar.cities;
export const selectSearchBarState = (state: RootState) => state.searchBar;

// export default
export default searchBarSlice.reducer;
