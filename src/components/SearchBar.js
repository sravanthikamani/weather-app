// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchCities } from '../services/cityService';

const SearchBar = ({ onSearch }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Fetch autocomplete suggestions based on input
  useEffect(() => {
    const fetchOptions = async () => {
      if (inputValue.length < 3) {
        setOptions([]);
        return;
      }
      try {
        const cities = await fetchCities(inputValue, 0, 10);
        const formattedOptions = cities.map((city) => ({
          value: city.name,
          label: city.name,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching autocomplete options:', error);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchOptions();
    }, 300); // Debounce API calls by 300ms

    return () => clearTimeout(debounceFetch);
  }, [inputValue]);

  return (
    <Select
      options={options}
      onInputChange={(value) => setInputValue(value)}
      onChange={onSearch}
      placeholder="Search for cities..."
      isClearable
      noOptionsMessage={() => 'No cities found'}
      className="search-bar"
    />
  );
};

export default SearchBar;
