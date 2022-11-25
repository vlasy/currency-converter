import React from 'react';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter'
import ExchangeRates from './components/ExchangeRates'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CurrencyConverter/>
        <ExchangeRates />
      </header>
    </div>
  );
}

export default App;
