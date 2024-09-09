import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCurrentWeather, fetchWeatherForecast } from '../services/weatherService';
import '../styles/styles.css';

const WeatherDetails = () => {
  const { cityName } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const weatherData = await fetchCurrentWeather(cityName);
        setCurrentWeather(weatherData);

        const forecastData = await fetchWeatherForecast(cityName);
        setForecast(forecastData.list.slice(0, 5));
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.');
      }
    };

    loadWeatherData();
  }, [cityName]);

  if (error) {
    return (
      <div className="container">
        <p>{error}</p>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="container">
        <h2>Loading weather data for {cityName}...</h2>
      </div>
    );
  }


  let weatherClass = '';
  if (currentWeather.weather[0].main === 'Clear') {
    weatherClass = 'weather-bg-sunny';
  } else if (currentWeather.weather[0].main === 'Rain') {
    weatherClass = 'weather-bg-rainy';
  } else if (currentWeather.weather[0].main === 'Clouds') {
    weatherClass = 'weather-bg-cloudy';
  }

  return (
    <div className={`container ${weatherClass}`}>
      <Link to="/" className="back-link">← Back to Cities</Link>
      <h1>Weather in {currentWeather.name}</h1>
      <div className="weather-details">
        <div className="current-weather">
          <h2>Current Weather</h2>
          <p><strong>Temperature:</strong> {currentWeather.main.temp}°C</p>
          <p><strong>Humidity:</strong> {currentWeather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {currentWeather.wind.speed} m/s</p>
          <p><strong>Description:</strong> {currentWeather.weather[0].description}</p>
        </div>
        <div className="forecast">
          <h2>5-Day Forecast</h2>
          {forecast.map((item, index) => (
            <div key={index} className="forecast-item">
              <p><strong>Date:</strong> {new Date(item.dt_txt).toLocaleDateString()}</p>
              <p><strong>Temperature:</strong> {item.main.temp}°C</p>
              <p><strong>Description:</strong> {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
