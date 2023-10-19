import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div>
      <h2>Start Page</h2>
    <Link to="/stage">Přejít na Stage</Link>
    <Link to="/starter">Přejít na Starter</Link>
    </div>
  );
};

export default StartPage;

