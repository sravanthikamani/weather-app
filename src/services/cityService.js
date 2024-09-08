// src/services/cityService.js
import axios from 'axios';

const BASE_URL = 'https://public.opendatasoft.com/api/records/1.0/search/';

export const fetchCities = async (query, start = 0, rows = 20) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        dataset: 'geonames-all-cities-with-a-population-1000',
        q: query,
        start: start,
        rows: rows,
        sort: 'name',
      },
    });

    // Log the entire response and the first record to inspect the structure
    console.log('API Response:', response.data);
    const records = response.data.records;
    console.log('Records:', records);
    if (records.length > 0) {
      console.log('First record:', records[0]);
    }

    // Ensure `records` is defined and has the correct structure
    if (!records || !Array.isArray(records)) {
      throw new Error('Invalid response structure');
    }

    // Map the records to include default values if fields are missing
    return records.map((record) => {
      const fields = record.fields || {};
      return {
        name: fields.name || 'Unknown Name',
        country: fields.cou_name_en || 'Unknown Country',  // Use `cou_name_en` for country name
        timezone: fields.timezone || 'Unknown Timezone',
      };
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
