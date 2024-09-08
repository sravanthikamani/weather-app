// src/components/GeolocationWeather.js
import React, { useState, useEffect } from 'react';

const GeolocationWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c5a27a149ba08f6ac3bd214adaaf68e8&units=metric`);
        const data = await response.json();
        setWeather(data);

        // Update history
        const newHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
        const locationIndex = newHistory.findIndex(entry => entry.name === data.name && entry.sys && entry.sys.country === data.sys.country);

        if (locationIndex === -1) {
          newHistory.push(data);
          localStorage.setItem('weatherHistory', JSON.stringify(newHistory));
          setHistory(newHistory);
        }

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            setError(err);
            setLoading(false);
          }
        );
      } else {
        setError(new Error('Geolocation is not supported by this browser.'));
        setLoading(false);
      }
    };

    getGeolocation();
  }, []);

  useEffect(() => {
    // Load history and favorites from local storage on component mount
    const savedHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    setHistory(savedHistory);

    const savedFavorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Function to clear history
  const clearHistory = () => {
    localStorage.removeItem('weatherHistory');
    setHistory([]);
  };

  // Function to add location to favorites
 const addToFavorites = () => {
  console.log('Adding to favorites:', weather); // Debugging line
  if (weather) {
    let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
    if (!favorites.find(fav => fav.name === weather.name && fav.sys && fav.sys.country === weather.sys.country)) {
      favorites.push(weather);
      localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
      setFavorites(favorites);
    }
  }
};

  // Function to clear favorites
  const clearFavorites = () => {
    localStorage.removeItem('weatherFavorites');
    setFavorites([]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="geolocation-weather">
      <div classname="current-weather">
      <h2>Current Weather for Your Location</h2>
      {weather && (
        <>
          <p><strong>Location:</strong> {weather?.name}, {weather?.sys?.country}</p>
          <p><strong>Temperature:</strong> {weather?.main?.temp}°C</p>
          <p><strong>Weather:</strong> {weather?.weather?.[0]?.description}</p>
          <p><strong>Humidity:</strong> {weather?.main?.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather?.wind?.speed} m/s</p>
          <button onClick={addToFavorites}>Add to Favorites</button>
        </>
      )}
      </div>
     

      <div classname="weather-history">
        <h3>History</h3>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item.name}, {item.sys?.country}</li>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
        <button onClick={clearHistory}>Clear History</button>
      </div>

      <div  className="weather-favorites">
        <h3>Favorites</h3>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((item, index) => (
              <li key={index}>{item.name}, {item.sys?.country}</li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}
        <button onClick={clearFavorites}>Clear Favorites</button>
      </div>
    </div>
  );
};

export default GeolocationWeather;
