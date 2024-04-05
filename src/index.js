import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // You can import your global styles here
import CarCatalog from './components/CarCatalog/CarCatalog'; // Assuming CarCatalog.js is your main component

ReactDOM.render(
  <React.StrictMode>
    <CarCatalog />
  </React.StrictMode>,
  document.getElementById('root')
);
