import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MetricSwitcherState {
    metric: boolean;
    imperial: boolean;
}

const initialState: MetricSwitcherState = { metric: true, imperial: false };

export const metricSwitcherSlice = createSlice({
    name: 'metricSwitcher',
    initialState,
    reducers: {
        switchUnits: (state) => {
            return {
                metric: !state.metric,
                imperial: !state.imperial,
            };
        },
    },
});

// actions
export const { switchUnits } = metricSwitcherSlice.actions;

// selectors
export const selectUnits = (state: RootState) => state.units;
export const selectActiveUnit = (state: RootState) =>
    state.units.metric ? 'metric' : 'imperial';

// export defaul
export default metricSwitcherSlice.reducer;
