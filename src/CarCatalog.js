import React, { useState, useEffect } from 'react';

const CarCatalog = () => {
    const [cars] = useState([
        {
            "id": "wj6qg7zpt09udm1m",
            "year": 2016,
            "make": "Honda",
            "model": "Civic"
        },
        {
            "id": "qwo1x40id6dav601",
            "year": 2019,
            "make": "Toyota",
            "model": "Corolla"
        },
        {
            "id": "bn6vgka1arprqz38",
            "year": 2021,
            "make": "Ford",
            "model": "F-150"
        }
    ]);
    const [allMakes] = useState(["Honda", "Toyota", "Ford", "Ferrari"]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [makeFilter, setMakeFilter] = useState("");

    // Define the derived state filteredCars based on makeFilter
    const filteredCars = makeFilter ? cars.filter(car => car.make === makeFilter) : cars;

    const fetchCarDetails = (carId) => {
        const car = cars.find(car => car.id === carId);
        setSelectedCar(car);
    };

    useEffect(() => {
        fetchAllCars().then(setCars);
    }, []);

    const fetchAllCars = async () => {
       
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...cars]);
            },2000);
                const allCars = [
                    {
                        "id": "wj6qg7zpt09udm1m",
                        "year": 2016,
                        "make": "Honda",
                        "model": "Civic"
                    },
                    {
                        "id": "qwo1x40id6dav601",
                        "year": 2019,
                        "make": "Toyota",
                        "model": "Corolla"
                    },
                    {
                        "id": "bn6vgka1arprqz38",
                        "year": 2021,
                        "make": "Ford",
                        "model": "F-150"
                    }
                ];
                resolve(allCars);
            }, 1000); // Simulating delay of 1 second
        });
    };

    const handleCloseDetails = () => {
        setSelectedCar(null);
    };

    const handleFilterByMake = (make) => {
        setMakeFilter(make);
    };

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
                {filteredCars.map((car) => (
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
