import React from 'react';
import CarCatalog from './components/CarCatalog/CarCatalog'; // Import CarCatalog component

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Car Catalog</h1>
      </header>
      <main>
        <CarCatalog />
      </main>
    </div>
  );
};

export default App;
