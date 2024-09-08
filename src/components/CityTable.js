// src/components/CityTable.js
import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchCities } from '../services/cityService';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import GeolocationWeather from './GeolocationWeather';
import '../styles/styles.css';

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState('');
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const loadCities = useCallback(async () => {
    try {
      const newCities = await fetchCities(query, start, 20);
      console.log('Loaded cities:', newCities); // Debugging line
      setCities((prevCities) => [...prevCities, ...newCities]);
      setStart((prevStart) => prevStart + 20);

      if (newCities.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load cities:', error);
      setHasMore(false);
    }
  }, [query, start]);

  useEffect(() => {
    loadCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSearch = (selectedOption) => {
    setQuery(selectedOption ? selectedOption.label : '');
    setCities([]);
    setStart(0);
    setHasMore(true);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCities = React.useMemo(() => {
    const sortableCities = [...cities];
    sortableCities.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableCities;
  }, [cities, sortConfig]);

  const addToFavorites = (city) => {
    let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
    if (!favorites.find(fav => fav.name === city.name && fav.country === city.country)) {
      favorites.push(city);
      localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    }
  };

  return (
    <div className="container">
      <GeolocationWeather />
      <h1>City Weather Forecast</h1>
      <SearchBar onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={cities.length}
        next={loadCities}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>No more cities to display.</p>}
      >
        <table className="city-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                City Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('country')}>
                Country {sortConfig.key === 'country' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('timezone')}>
                Timezone {sortConfig.key === 'timezone' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCities.map((city, index) => (
              <tr key={`${city.name}-${index}`}>
                <td>
                  <Link to={`/weather/${encodeURIComponent(city.name)}`}>{city.name}</Link>
                </td>
                <td>{city.country}</td>
                <td>{city.timezone}</td>
                <td>
                  <button onClick={() => addToFavorites(city)}>Add to Favorites</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CityTable;
