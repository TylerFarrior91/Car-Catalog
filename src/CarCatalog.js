import React, { useState, useEffect } from 'react';

const CarCatalog = () => {
    const [cars, setCars] = useState([]);
    const [allMakes, setAllMakes] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [makeFilter, setMakeFilter] = useState("");


    const filteredCars = makeFilter ? cars.filter(car => car.make === makeFilter) : cars;

    const fetchAllCars = async () => {
        const response = await fetch("https://exam.razoyo.com/api/cars");
        const data = await response.json();
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

    const handleCarHover = async (make) => {
        // Fetch cars for the selected make only when hovering over the car make
        const response = await fetch(`https://exam.razoyo.com/api/cars?make=${make}`);
        const data = await response.json();
        setCars(data.cars);
        setMakeFilter(make); // Automatically filter by the selected make
    };

    return (
        <div className="container mx-auto p-4">
            <div className='text-center'> <h1 className="text-3xl font-bold mb-4">Car Catalog</h1> </div>
            <label htmlFor="makeSelect" className="block mb-2">Select Car Make:</label>
            <select id="makeSelect" onChange={(e) => {
                handleCloseDetails()
                handleFilterByMake(e.target.value)
            }} className="border border-gray-300 rounded p-2 mb-4">
                <option value="">All Makes</option>
                {allMakes.map((make) => (
                    <option key={make} value={make} onMouseEnter={() => handleCarHover(make)}
                    >
                        {make}
                    </option>
                ))}
            </select>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredCars.map((car) => (
                    <li key={car.id} className="border border-gray-500 rounded p-4">
                        <div className="font-semibold">{car.make} {car.model}</div>
                        <button onClick={() => setSelectedCar(car)} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">Open</button>
                    </li>
                ))}
            </ul>
            {selectedCar && (
                <div className="mt-8 border border-gray-500 rounded p-4 flex">
                    <div className="md:mr-5 mb-5 md:mb-0 mr-3">
                        <img src={selectedCar.image} alt={`${selectedCar.make} ${selectedCar.model}`}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">{selectedCar.make} {selectedCar.model}</h2>
                        <p>Year: {selectedCar.year}</p>
                        <p>Price: ${selectedCar.price.toLocaleString()}</p>
                        <p>MPG: {selectedCar.mpg}</p>
                        <p>Seats: {selectedCar.seats}</p>
                        <button onClick={handleCloseDetails} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarCatalog;
