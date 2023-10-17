import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false);

  useEffect(() => {
    if (active) {
      const handleKeyUp = (event) => {
        const userInput = event.key;
        if (lettersLeft.includes(userInput)) {
          const updatedLetters = lettersLeft.replace(userInput, '');
          setLettersLeft(updatedLetters);

          if (updatedLetters === '') {
            onFinish();
          }
        } else {
          setMistake(true);
          onMistake();
        }
      };

      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [lettersLeft, onFinish, active, onMistake]);

  const wordboxClassName = mistake
    ? 'wordbox wordbox--mistake'
    : active
    ? 'wordbox wordbox--active'
    : 'wordbox';

  useEffect(() => {
    if (!lettersLeft && mistake) {
      setMistake(false);
    }
  }, [lettersLeft, mistake]);

  return <div className={wordboxClassName}>{lettersLeft}</div>;
};

export default Wordbox;
/* čtvrtý úkol
import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false);

  useEffect(() => {
    if (active) {
      const handleKeyUp = (event) => {
        const userInput = event.key;
        if (lettersLeft.includes(userInput)) {
          const updatedLetters = lettersLeft.replace(userInput, '');
          setLettersLeft(updatedLetters);

          if (updatedLetters === '') {
            onFinish();
          }
        } else if (lettersLeft === userInput) {
          onFinish();
        } else {
          setMistake(true);
        }
      };

      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [lettersLeft, onFinish, active]);

  // Odebrání třídy, pokud není chyba
  const wordboxClassName = mistake ? 'wordbox wordbox--mistake' : 'wordbox';

  useEffect(() => {
    if (!lettersLeft && mistake) {
      setMistake(false);
    }
  }, [lettersLeft, mistake]);

  return (
    <div className={wordboxClassName}>{lettersLeft}</div>
  );
};

export default Wordbox;
/* třetí úkol
import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false);

  useEffect(() => {
    const handleKeyUp = (event) => {
      const userInput = event.key;
      if (lettersLeft.includes(userInput)) {
        const updatedLetters = lettersLeft.replace(userInput, '');
        setLettersLeft(updatedLetters);

        if (updatedLetters === '') {
          onFinish();
        }
      } else if (lettersLeft === userInput) {
        onFinish();
      } else {
        setMistake(true);
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, onFinish]);

  // Odebrání třídy, pokud není chyba
  const wordboxClassName = mistake ? 'wordbox wordbox--mistake' : 'wordbox';

  useEffect(() => {
    if (!lettersLeft && mistake) {
      setMistake(false);
    }
  }, [lettersLeft, mistake]);

  return (
    <div className={wordboxClassName}>{lettersLeft}</div>
  );
};

export default Wordbox;


/* třetí úkol, ale nevypisuje zpátky zelenou barvu
import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false); // Nový stav pro sledování chyb

  useEffect(() => {
    const handleKeyUp = (event) => {
      const userInput = event.key;
      if (lettersLeft.includes(userInput)) {
        const updatedLetters = lettersLeft.replace(userInput, '');
        setLettersLeft(updatedLetters);

        if (updatedLetters === '') {
          onFinish();
        }
      } else if (lettersLeft === userInput) {
        onFinish();
      } else {
        setMistake(true); // Uživatel udělal překlep
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, onFinish]);

  // Pokud byla udělána chyba, přidej třídu pro zvýraznění
  const wordboxClassName = mistake ? 'wordbox wordbox--mistake' : 'wordbox';

  return (
    <div className={wordboxClassName}>{lettersLeft}</div>
  );
};

export default Wordbox;


/* druhý úkol 
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