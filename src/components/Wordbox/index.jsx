
import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState(word);  

  useEffect(() => {
    const handleKeyUp = (event) => {
      const userInput = event.key;
      if (lettersLeft.includes(userInput)) {
        const updatedLetters = lettersLeft.replace(userInput, '');
        setLettersLeft(updatedLetters);

        if (updatedLetters === '') {
          onFinish(); // Informovat rodičovskou komponentu o dokončení
        }
      } else if (lettersLeft === userInput) {
        onFinish(); // Pokud uživatel napsal správně poslední písmenko
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, onFinish]);

  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox;


/* První kod
import React, { useState } from 'react';
import './style.css';

const Wordbox = ({ word }) => {
  const [lettersLeft, setLettersLeft] = useState(word);  
  
  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox;*/

/*Kod s mazáním písmen
import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word }) => {
  const [lettersLeft, setLettersLeft] = useState(word);  

  useEffect(() => {
    const handleKeyUp = (event) => {
      const userInput = event.key;
      if (lettersLeft.includes(userInput)) {
        const updatedLetters = lettersLeft.replace(userInput, '');
        setLettersLeft(updatedLetters);
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft]);

  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox; */




/* kod s přidáním props onFinish
import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState(word);  

  useEffect(() => {
    const handleKeyUp = (event) => {
      const userInput = event.key;
      if (lettersLeft.includes(userInput)) {
        const updatedLetters = lettersLeft.replace(userInput, '');
        setLettersLeft(updatedLetters);

        if (updatedLetters === '') {
          onFinish(); // Informovat rodičovskou komponentu o dokončení
        }
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, onFinish]);

  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox;*/