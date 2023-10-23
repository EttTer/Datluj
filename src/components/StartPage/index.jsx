import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css"

const StartPage = () => {
  return ( 
  <>
  <div className='Start_page_background'>
  <h2 className='Start_page_title'>Vítejte v aplikaci Datluj</h2>

    <div className='Start_page_container'>
    <button className='Start_page_button'><Link to="/starter">Procvičování</Link></button>
      <button className='Start_page_button'><Link className to="/stage">Hra s časovým limitem</Link></button>
      
      <button className='Start_page_button'><Link to="/result">Výsledky</Link></button>
      
 
    
    </div>
    </div></>
  );
};

export default StartPage;

