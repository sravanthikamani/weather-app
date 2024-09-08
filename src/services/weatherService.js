import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; // Ensure this is correctly loaded
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// Fetch current weather data
export const fetchCurrentWeather = async (cityName) => {
  const normalizedCityName = cityName.trim();
  
  // Remove any unwanted characters or trim quotes
  const sanitizedCityName = normalizedCityName.replace(/'/g, '');

  console.log(`Fetching weather data for city: ${sanitizedCityName}`);
  
  try {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        q: sanitizedCityName,
        appid: API_KEY,
        units: 'metric',
      },
    });
    console.log('Weather data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch weather forecast data
export const fetchWeatherForecast = async (cityName) => {
  const sanitizedCityName = cityName.trim().replace(/'/g, '');
  
  try {
    const response = await axios.get(`${BASE_URL}forecast`, {
      params: {
        q: sanitizedCityName,
        appid: API_KEY,
        units: 'metric',
      },
    });
    console.log('Forecast data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error.response ? error.response.data : error.message);
    throw error;
  }
};
