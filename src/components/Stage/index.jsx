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
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [wordsWritten, setWordsWritten] = useState(0);
  const [mistakeWords, setMistakeWords] = useState([]);
  const [mistakesByWord, setMistakesByWord] = useState([0, 0, 0]);
  const [playerName, setPlayerName] = useState(""); // state pro ukládání jména 

  const [wordsLength, setWordsLength] = useState(3); // délka slov právě teď
  const [words, setWords] = useState([...Array(3)].map(() => generateWord(3))); // seznam slov s určitou délkou
  const [isPaused, setIsPaused] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  /*useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);*/

  useEffect(() => {
    let timer;
    if (isGameStarted && !isPaused && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }
  
    return () => clearTimeout(timer);
  }, [timeLeft, isPaused, isGameStarted]);


  
  useEffect(() => {
    if (isGameStarted && timeLeft === 0) {
      let message = `Hra skončila. Napsal(a) jsi ${wordsWritten} slov(a) a přitom jsi udělal(a) ${mistakes} chyb(a). \n\n`;
  
      if (mistakeWords.length > 0) {
        message += 'Slova s chybou:\n';
        const uniqueMistakeWords = [...new Set(mistakeWords)]; 
  
        uniqueMistakeWords.forEach((word) => {
          const mistakesInWord = mistakeWords.filter(w => w === word).length;
          message += `Slovo ${word} - ${mistakesInWord} chyb(y)\n`;
        });
      }
  
      const playerName = prompt("Zadejte své jméno:"); // Use local variable playerName
  
      const result = {
        playerName: playerName,
        wordsWritten: wordsWritten, 
        mistakes: mistakes
      };
  
      // výsledky do localStorage
      if (playerName && playerName.trim() !== "") {
        const results = JSON.parse(localStorage.getItem("results")) || [];
        results.push(result);
        localStorage.setItem("results", JSON.stringify(results));
      }
  
    
    }
  }, [isGameStarted, timeLeft, wordsWritten, mistakes, mistakeWords]);


  
  const handleFinish = (wordIndex) => {
    const newWords = [...words.slice(1), generateWord(wordsLength)]; 
    setWords(newWords);
    setWordsWritten(prevWordsWritten => prevWordsWritten + 1);

    const newMistakesByWord = [...mistakesByWord];
    newMistakesByWord[wordIndex] = 0;
    setMistakesByWord(newMistakesByWord);

    if (wordsWritten === 2) { // když jsem napsala 2 slova, přidám další 2 slova o délce 3
      const newWords = [...words.slice(2), generateWord(3), generateWord(3)]; 
      setWords(newWords);
      setWordsWritten(prevWordsWritten => prevWordsWritten + 2); // Přidá dvě slova
    }

    if (wordsWritten % 5 === 0 && wordsWritten > 0) { 
      if (wordsLength < 20) { 
        setWordsLength(prevLength => prevLength + 1); 
        setWords([...newWords.slice(0, 2), generateWord(wordsLength + 1)]);
      }
    }
  };

  const handleMistake = (wordIndex) => {
    setMistakes(prevMistakes => prevMistakes + 1);
    setMistakeWords(prevMistakeWords => [...prevMistakeWords, words[wordIndex]]);
  };

  const restartGame = () => {
    setIsGameStarted(true); // Přidáno - označí, že hra začala
    setMistakes(0);
    setTimeLeft(20);
    setWordsWritten(0);
    setMistakeWords([]);
    setMistakesByWord([0, 0, 0]);
    setPlayerName(""); 
    setWordsLength(3);
    setWords([...Array(3)].map(() => generateWord(3)));
  };

  const handlePause = () => {
    setIsPaused(true);
  };
  
  const handleResume = () => {
    setIsPaused(false);
  };

  const handleTogglePause = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };


  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className={`stage__timeLeft ${isPaused ? 'paused' : ''}`}>
  Čas zbývající: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
</div>
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
      <div className="stage__buttons">
      <div className="stage__buttons">
  {isPaused ? (
    <button onClick={handleTogglePause}>Resume Game</button>
  ) : (
    <button onClick={handleTogglePause}>Pause Game</button>
  )}
</div>
      <button onClick={restartGame}>Start Game</button>
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

