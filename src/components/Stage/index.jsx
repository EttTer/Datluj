
import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState([generateWord(6), generateWord(6), generateWord(6)]);
  const [mistakes, setMistakes] = useState(0); 

  const handleFinish = () => {
    const newWords = [...words.slice(1), generateWord(6)];
    setWords(newWords);
  };

  const handleMistake = () => {
    setMistakes(prevMistakes => prevMistakes + 1); // navýšení počtu chyb
  };

  

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div> {/* počet chyb */}
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox 
            word={word} 
            key={word} 
            onFinish={handleFinish} 
            active={index === 0} 
            onMistake={handleMistake}  // add prop onMistake
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;

/* 4. úkol
import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState([generateWord(6), generateWord(6), generateWord(6)]);

  const handleFinish = () => {
    const newWords = [...words.slice(1), generateWord(6)];
    setWords(newWords);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox word={word} key={word} onFinish={handleFinish} active={index === 0} />
        ))}
      </div>
    </div>
  );
};

export default Stage;
/* třetí úkol
import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState([generateWord(6), generateWord(6), generateWord(6)]);

  const handleFinish = () => {
    setWords([generateWord(6), generateWord(6), generateWord(6)]);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word) => (
          <Wordbox word={word} key={word} onFinish={handleFinish} />
        ))}
      </div>
    </div>
  );
};

export default Stage;
/* do úkolu 4
import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState([generateWord(6)]);

  const handleFinish = () => {
    setWords([generateWord(6)]);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word) => (
          <Wordbox word={word} key={word} onFinish={handleFinish} />
        ))}
      </div>
    </div>
  );
};

export default Stage;
/* Prvotní kod 
import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState(['jahoda']);

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word) => <Wordbox word={word} key={word} />)}
      </div>
    </div>
  );
};

export default Stage;*/


/* kod, který smaže uhádnuté slovo
import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState(['jahoda']);

  const handleFinish = () => {
    setWords([]);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word) => (
          <Wordbox word={word} key={word} onFinish={handleFinish} />
        ))}
      </div>
    </div>
  );
};

export default Stage;*/

