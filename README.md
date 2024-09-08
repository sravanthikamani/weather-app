### Project Overview
This web application is designed to display a table of cities using infinite scroll and allow users to search, filter, and sort through the data. By clicking on a city, users can access detailed weather information, including current weather and forecast data.
The project uses React Js for the frontend, and APIs like OpenWeatherMap and OpenDataSoft for fetching weather and city data.
### Features
    ### Cities Table
        1. Displays cities in a table format with columns like city name, country, timezone, etc.
        2. Implements infinite scroll to load city data as users scroll.
        3. Search-as-you-type functionality with autocomplete for city names.
        4. sorting of table columns.
        5. Clicking on the city name takes you to the weather page for that city.
        6. Right-clicking the city name and opening in a new tab also opens the weather page.
            Weather Page
        7. Displays current weather information (temperature, humidity, wind speed, etc.) using the  OpenWeatherMap API.
        8.  Displays a 5-day forecast with high/low temperatures, weather descriptions, and precipitation chances.
        9.  Dynamic backgrounds based on the current weather.
    ### Optional Features
        1. Save favorite locations for quick access.
        2. Geolocation-based weather data.
        3. Track weather history for recently viewed locations.
    ### State Management
        The application utilizes React's state management to handle data, avoid re-fetching, and manage global state such as weather data and city information. The state is centrally managed and passed down through components as props.

    ### Responsive Design
        The application is designed to be fully responsive, ensuring it works well on a variety of screen sizes, including desktops, tablets, and mobile devices.
    ### Error Handling
        The application implements error handling for failed API requests and invalid search queries. User-friendly error messages are displayed in case of:

        API request failures.

### Technologies Used
    1. React: For building the UI.
    2. OpenWeatherMap API: To fetch current and forecast weather data.
    3. OpenDataSoft API: To fetch city data.
    4. CSS : For styling and responsive design.
    5. Axios or Fetch API: To make HTTP requests.
    6. React Router: For navigation between the cities table and weather pages.
    7. Netlify: For deployment.
### Installation and Setup
    Prerequisites
        npm 
### Deployment
The application is deployed using [Netlify]. You can visit the live application at: 
https://weather-technology.netlify.app/

