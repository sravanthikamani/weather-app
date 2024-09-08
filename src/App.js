// src/App.js (excerpt)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CityTable from './components/CityTable';
import WeatherDetails from './components/WeatherDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CityTable />} />
        <Route path="/weather/:cityName" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
