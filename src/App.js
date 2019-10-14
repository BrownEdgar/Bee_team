import React from 'react';
import logo from './logo.svg';
import Converter from './Components/Converter.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Converter />
      </header>
    </div>
  );
}

export default App;
