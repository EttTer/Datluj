
import React, { useState, useEffect } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(10);
  const [wordsWritten, setWordsWritten] = useState(0);
  const [mistakeWords, setMistakeWords] = useState([]);
  const [mistakesByWord, setMistakesByWord] = useState([0, 0, 0]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      let message = `Hra skončila. Stihl(a) jsi napsat ${wordsWritten} slov(a) a udělal(a) jsi ${mistakes} chyb(a). \n\n`;

      if (mistakeWords.length > 0) {
        message += 'Slova s chybou:\n';
        mistakeWords.forEach((word, index) => {
          message += `Slovo ${word} - ${mistakesByWord[index]} chyb(y)\n`;
        });
      }

      alert(message);
    }
  }, [timeLeft, wordsWritten, mistakes, mistakeWords, mistakesByWord]);

  const handleFinish = (wordIndex) => {
    const newWords = [...words.slice(1), generateWord(6)];
    setWords(newWords);
    setWordsWritten(prevWordsWritten => prevWordsWritten + 1);

    const newMistakesByWord = [...mistakesByWord];
    newMistakesByWord[wordIndex] = 0;
    setMistakesByWord(newMistakesByWord);
  };

  const handleMistake = (wordIndex) => {
    setMistakes(prevMistakes => prevMistakes + 1);
    setMistakeWords(prevMistakeWords => [...prevMistakeWords, words[wordIndex]]);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__timeLeft">Čas zbývající: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox 
            word={word} 
            key={word} 
            onFinish={handleFinish} 
            active={index === 0} 
            onMistake={handleMistake}  
            wordIndex={index}
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

