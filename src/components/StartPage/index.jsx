import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div>
      <h2>Stage Page</h2>
      <Link to="/stage">Přejít na Stage</Link>
    </div>
  );
};

export default StartPage;