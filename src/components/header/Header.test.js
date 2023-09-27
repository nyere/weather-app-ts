/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-container */
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
    it('should render the header with title and subtitle', () => {
        const { getByText } = render(<Header />);

        // Assert that the title and subtitle are rendered
        const titleElement = getByText('Simple Weather App');
        const subtitleElement = getByText(
            'Check your local weather, or take a look outside your window 😊'
        );

        expect(titleElement).toBeInTheDocument();
        expect(subtitleElement).toBeInTheDocument();
    });

    it('should have the correct class names', () => {
        const { container } = render(<Header />);

        // Assert that the header has the correct class names
        const headerElement = container.querySelector('.header');
        const titleElement = container.querySelector('.header__title');
        const subtitleElement = container.querySelector('.header__subtitle');

        expect(headerElement).toHaveClass('header');
        expect(titleElement).toHaveClass('header__title');
        expect(titleElement).toHaveClass('header__title--orange');
        expect(subtitleElement).toHaveClass('header__subtitle');
        expect(subtitleElement).toHaveClass('header__subtitle--white');
    });
});
