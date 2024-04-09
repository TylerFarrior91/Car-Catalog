import React, { useState, useEffect } from 'react';

const CarCatalog = () => {
    const [cars, setCars] = useState([]);
    const [allMakes, setAllMakes] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [makeFilter, setMakeFilter] = useState("");

    // Define the derived state filteredCars based on makeFilter
    const filteredCars = makeFilter ? cars.filter(car => car.make === makeFilter) : cars;

    const fetchCarDetails = (carId) => {
        const car = cars.find(car => car.id === carId);
        setSelectedCar(car);
    };

    const fetchAllCars = async () => {
        const response = await fetch("https://exam.razoyo.com/api/cars")
        const data = await response.json();
        console.log(data);
        setCars(data.cars);
        setAllMakes(data.makes);
    };

    useEffect(() => {
        fetchAllCars();
    }, []);

    const handleCloseDetails = () => {
        setSelectedCar(null);
    };

    const handleFilterByMake = (make) => {
        setMakeFilter(make);
    };
    console.log(cars);
    return (
        <div>
            <h1>Car Catalog</h1>
            <label htmlFor="makeSelect">Select Car Make:</label>
            <select id="makeSelect" onChange={(e) => handleFilterByMake(e.target.value)}>
                <option value="">All Makes</option>
                {allMakes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                ))}
            </select>

            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        <div>{car.make} {car.model}</div>
                        <button onClick={() => fetchCarDetails(car.id)}>Open</button>
                    </li>
                ))}
            </ul>

            {selectedCar && (
                <div>
                    <h2>{selectedCar.make} {selectedCar.model}</h2>
                    <button onClick={handleCloseDetails}>Close</button>
                </div>
            )}
        </div>
    );
};

export default CarCatalog;
