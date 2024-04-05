// App.js

import React from 'react';
import './App.css'; // Import global styles
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
