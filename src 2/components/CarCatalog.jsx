import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarCatalog = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [filteredCars, setFilteredCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch cars and makes on component mount
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('https://dev-test-frontend-werpwe2p3q-uc.a.run.app/cars');
      setCars(response.data.cars);
      setMakes(response.data.makes);
      setToken(response.headers['your-token']);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const fetchCarDetails = async (carId) => {
    try {
      const response = await axios.get(`https://dev-test-frontend-werpwe2p3q-uc.a.run.app/cars/${carId}`, {
        headers: {
          'Your-Token': token,
        },
      });
      setSelectedCar(response.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  const handleCloseDetails = () => {
    setSelectedCar(null);
  };

  const handleFilterByMake = async (make) => {
    try {
      const response = await axios.get(`https://dev-test-frontend-werpwe2p3q-uc.a.run.app/cars?make=${make}`);
      setFilteredCars(response.data.cars);
    } catch (error) {
      console.error('Error filtering cars by make:', error);
    }
  };

  return (
    <div>
      <h1>Car Catalog</h1>
      <label htmlFor="makeSelect">Select Car Make:</label>
      <select id="makeSelect" onChange={(e) => handleFilterByMake(e.target.value)}>
        <option value="">All Makes</option>
        {makes.map((make) => (
          <option key={make} value={make}>{make}</option>
        ))}
      </select>
      
      <ul>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <li key={car.id}>
              <div>{car.name}</div>
              <button onClick={() => fetchCarDetails(car.id)}>Open</button>
            </li>
          ))
        ) : (
          cars.map((car) => (
            <li key={car.id}>
              <div>{car.name}</div>
              <button onClick={() => fetchCarDetails(car.id)}>Open</button>
            </li>
          ))
        )}
      </ul>
      
      {selectedCar && (
        <div>
          <h2>{selectedCar.name}</h2>
          {/* Display additional car details */}
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CarCatalog;