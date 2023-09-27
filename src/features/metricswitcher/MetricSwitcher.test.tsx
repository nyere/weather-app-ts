/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import MetricSwitcher from './MetricSwitcher';
import { selectUnits, switchUnits } from './MetricSwitcherSlice';
import { SearchBarState } from '../searchbar/SearchBarSlice';
import { MetricSwitcherState } from './MetricSwitcherSlice';
import { WeatherConditionState } from '../weatherconditions/WeatherConditionsSlice';
import { WeatherForecastState } from '../weatherforecast/WeatherForecastSlice';
import { store } from '../../app/store';
import { act } from 'react-dom/test-utils';

interface StoreState {
    searchBar: SearchBarState;
    units: MetricSwitcherState;
    conditions: WeatherConditionState;
    forecast: WeatherForecastState;
}

describe('MetricSwitcher Component', () => {
    it('should render MetricSwitcher component correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MetricSwitcher />
            </Provider>
        );

        expect(getByText('Metric: °C, m/s')).toBeInTheDocument();
        expect(getByText('Imperial: °F, mph')).toBeInTheDocument();
    });

    it('should switch units when <imperial> button is clicked and active unit is Metric', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MetricSwitcher />
            </Provider>
        );

        fireEvent.click(getByText('Imperial: °F, mph'));

        const updatedState = store.getState();
        const units = selectUnits(updatedState as StoreState);
        expect(units).toEqual({ metric: false, imperial: true });
    });

    it('should not switch units when <imperial> button is clicked and active unit is Imperial', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MetricSwitcher />
            </Provider>
        );
        // dispatching switchUnits() before asserting to ensure that {metric: false, imperial: true}
        act(() => {
            store.dispatch(switchUnits());
        });

        fireEvent.click(getByText('Imperial: °F, mph'));

        const updatedState = store.getState();
        const units = selectUnits(updatedState as StoreState);
        expect(units).toEqual({ metric: false, imperial: true });
    });

    it('should switch units when <metric> button is clicked and active unit is Imperial', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MetricSwitcher />
            </Provider>
        );
        // dispatching switchUnits() before asserting to ensure that {metric: false, imperial: true}
        act(() => {
            store.dispatch(switchUnits());
        });

        fireEvent.click(getByText('Metric: °C, m/s'));

        const updatedState = store.getState();
        const units = selectUnits(updatedState as StoreState);
        expect(units).toEqual({ metric: true, imperial: false });
    });

    it('should not switch units when <metric> button is clicked and active unit is Metric', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MetricSwitcher />
            </Provider>
        );

        fireEvent.click(getByText('Metric: °C, m/s'));

        const updatedState = store.getState();
        const units = selectUnits(updatedState as StoreState);
        expect(units).toEqual({ metric: true, imperial: false });
    });
});
