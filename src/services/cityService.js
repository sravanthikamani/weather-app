
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

    console.log('API Response:', response.data);
    const records = response.data.records;
    console.log('Records:', records);
    if (records.length > 0) {
      console.log('First record:', records[0]);
    }

    
    if (!records || !Array.isArray(records)) {
      throw new Error('Invalid response structure');
    }

    
    return records.map((record) => {
      const fields = record.fields || {};
      return {
        name: fields.name || 'Unknown Name',
        country: fields.cou_name_en || 'Unknown Country', 
        timezone: fields.timezone || 'Unknown Timezone',
      };
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
