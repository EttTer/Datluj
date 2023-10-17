import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Stage from './components/Stage';
import './style.css';
import Countdown from 'react-countdown';

const App = () => {
  return (
    <div className="container">
      <h1>Datlování</h1>
      <Stage />
    </div>
  );
};

createRoot(
  document.querySelector('#app'),
).render(<App />);
