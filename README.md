# Simple Weather App

This is a simple weather app built using React and Redux Toolkit. It allows users to search for the current weather conditions and forecast of a city by entering its name. The app utilizes OpenWeather APIs to retrieve weather data based on the city coordinates.

## Table of Contents

-   [Getting Started](#getting-started)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Folder Structure](#folder-structure)
-   [Contributing](#contributing)
-   [License](#license)

## Getting Started

To get started with the Simple Weather App, follow the instructions below.

### Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/nyere/weather-app-ts.git
```

2. Navigate to the project directory:

```bash
cd simple-weather-app
```

3. Install the project dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your OpenWeather API key:

```env
REACT_APP_WEATHER_API_KEY=your-api-key
```

Replace `your-api-key` with your actual OpenWeather API key.

5. Start the development server:

```bash
npm start
```

## Usage

1. Enter the name of a city in the search bar and click the search button.

2. The app will fetch the current weather conditions and forecast for the entered city.

3. Weather data will be displayed on the screen, including temperature, humidity, wind speed, and more.

4. You can switch between metric and imperial units using the unit switcher.

## Folder Structure

The project is organized into the following folders and files:

-   `App.tsx`: The main application component that renders the header, search bar, weather conditions, and forecast components.
-   `App.css`: Styles for the main application component.
-   `app/store.ts`: Redux store configuration.
-   `app/hooks.ts`: Custom Redux hooks for useDispatch and useSelector.
-   `utils/unixTimestampDecoder.ts`: Utility function for converting Unix timestamps to human-readable date and time.
-   `components/errorbox/ErrorBox.tsx`: Error message component.
-   `components/errorbox/ErrorBox.css`: Styles for the error message component.
-   `components/header/Header.tsx`: Header component displaying the app title and subtitle.
-   `components/header/Header.css`: Styles for the header component.
-   `components/header/Header.test.js`: Unit tests for the header component.
-   `components/page-placeholder/PagePlaceholder.tsx`: Component for displaying a random placeholder image which is displayed upon first load.
-   `components/page-placeholder/PagePlaceholder.css`: Styles for the placeholder component.
-   `components/searchresults/SearchResults.tsx`: Component for displaying search results and handling city selection.
-   `components/searchresults/SearchResults.css`: Styles for the search results component.

-   Various Redux slices (`SearchBarSlice`, `MetricSwitcherSlice`, `WeatherConditionsSlice`, `WeatherForecastSlice`) in the `features` folder to manage application state and API calls.
-   `/features/metricswitcher/MetricSwitcher.tsx`: the component responsible for switcher between Metric and Imperial units
-   `/features/metricswitcher/MetricSwitcher.css`: Styles for the header component.
-   `/features/metricswitcher/MetricSwitcherSlice.ts`: the Redux Slice for this component, handling the state of Metric/Imperial units
-   `/features/metricswitcher/MetricSwitcher.test.tsx`: some simple tests for the component
-   `/features/searchbar/SearchBar.tsx`: component responsible for searching a location. It takes the location provided by the user and submit a query to the Geo API in order to obtain its coordinates. If no such city exits, it displays an error. If the API returns results for the city, it will display them using the <SearchResults /> component
-   `/features/searchbar/SearchBarSlice.ts`: the Redux slice for this component, handling async fetching city info
-   `/features/weatherconditions/WeatherConditions.tsx`: the component responsible for displaying current weather conditions based on the selected search result
-   `/features/weatherconditions/WeatherConditionsSlice.ts`: the Redux slice for this component which fetches and stores weather conditions based on the selected search result
-   `/features/weatherforecast/WeatherForecast.tsx`: the component responsible for displaying weather forecast. It displays it for the next 5 days in a 3-hour step interval, which can be changed via the arrow butotns.
-   `/features/weatherforecast/WeatherForecastSlice.ts`: the Redux slice for this component which fetches and stores weather forecast based on the selected search result.
