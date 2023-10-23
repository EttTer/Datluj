import React, { useState, useEffect } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { projectFirestore } from '../../firebase/config';

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
  // (previous state) => new state
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [wordsWritten, setWordsWritten] = useState(0);
  const [mistakeWords, setMistakeWords] = useState([]);
  const [mistakesByWord, setMistakesByWord] = useState([0, 0, 0]);
  const [playerName, setPlayerName] = useState("");
  const [wordsLength, setWordsLength] = useState(3);
  const [words, setWords] = useState([...Array(3)].map(() => generateWord(3)));
  const [isPaused, setIsPaused] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true);
    }
  }, [isGameStarted, timeLeft]);

  const handleFinish = (wordIndex) => {
    const newWords = [...words.slice(1), generateWord(wordsLength)]; 
    setWords(newWords);
    setWordsWritten(prevWordsWritten => prevWordsWritten + 1);

    const newMistakesByWord = [...mistakesByWord];
    newMistakesByWord[wordIndex] = 0;
    setMistakesByWord(newMistakesByWord);

    if (wordsWritten === 2) { 
      const newWords = [...words.slice(2), generateWord(3), generateWord(3)]; 
      setWords(newWords);
      setWordsWritten(prevWordsWritten => prevWordsWritten + 2); 
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
    setIsGameStarted(true);
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (timeLeft === 0) {
      const playerName = prompt("Please enter your name:");

      if (playerName && playerName.trim() !== "") {
        setPlayerName(playerName);
        setIsGameStarted(false);
        let message = `The game has ended. You wrote ${wordsWritten} word(s) and made ${mistakes} mistake(s).\n\n`;
        if (mistakeWords.length > 0) {
          message += 'Words with mistakes:\n';
          const uniqueMistakeWords = [...new Set(mistakeWords)];
          uniqueMistakeWords.forEach((word) => {
            const mistakesInWord = mistakeWords.filter(w => w === word).length;
            message += `Word ${word} - ${mistakesInWord} mistake(s)\n`;
          });
        }
        const result = {
          playerName: playerName,
          wordsWritten: wordsWritten, 
          mistakes: mistakes
        };
        const results = JSON.parse(localStorage.getItem("results")) || [];
        results.push(result);
        localStorage.setItem("results", JSON.stringify(results));

        const firebaseResult = {
          playerName: playerName,
          wordsWritten: wordsWritten, 
          mistakes: mistakes
        }

        try {
           projectFirestore.collection("players").add(firebaseResult);
          console.log("Výsledky hráče byly přidány");
        } catch (error) {
          console.error("Přidání hráče selhalo ", error);
        }
       
      }
    }
  };

  return (<>
  <div className='Stage_page_container'>
      <button className='Start_page_button'><Link to="/">Úvodní strana</Link></button>
      <button className='Start_page_button'><Link className to="/starter">Hra bez časovéhu limitu</Link></button>
      
      <button className='Start_page_button'><Link to="/result">Výsledky</Link></button></div>
 
    <div className="stage">
    
    
      <h2 className="stage__mistakes">Chyby: {mistakes}</h2>
      <div className={`stage__timeLeft ${isPaused ? 'paused' : ''}`}>
        Zbývá: {Math.floor(timeLeft / 60)}:{timeLeft % 60} sekund
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
        {isGameStarted && timeLeft > 0 && (
          <button onClick={handleTogglePause}>
            {isPaused ? 'Resume Game' : 'Pause Game'}
          </button>
        )}
        {isGameStarted && (
          <button onClick={restartGame}>Start New Game</button>
        )}
        {!isGameStarted && timeLeft === 0 && (
          <button onClick={restartGame}>Start New Game</button>
        )}
        {!isGameStarted && timeLeft > 0 && (
          <button onClick={restartGame}>Start Game</button>
        )}
      </div>
      

      <Modal show={isModalOpen} onHide={handleModalClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Napsal(a) jsi {wordsWritten} slov a udělal(a) jsi {mistakes} chyb.</p>
          {mistakeWords.length > 0 && (
            <div>
              <p>Slova s chybami:</p>
              <ul>
                { [...new Set(mistakeWords)].map(word => (
                  <li key={word}>{word} - {mistakeWords.filter(w => w === word).length} mistake(s)</li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div></>
    
  );
};

export default Stage;


/* funkční před modálním oknem
import React, { useState, useEffect } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';
import { Link } from 'react-router-dom';

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
  
      const playerName = prompt("Zadejte své jméno:"); // zažádá jméno playerName
  
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
    setIsGameStarted(true); // hra začala
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
        {isGameStarted && timeLeft > 0 && (
          <button onClick={handleTogglePause}>
            {isPaused ? 'Resume Game' : 'Pause Game'}
          </button>
        )}
        {isGameStarted && (
          <button onClick={restartGame}>Start New Game</button>
        )}
        {!isGameStarted && timeLeft === 0 && (
          <button onClick={restartGame}>Start New Game</button>
        )}
        {!isGameStarted && timeLeft > 0 && (
          <button onClick={restartGame}>Start Game</button>
        )}
      </div>
      <Link to="/">Přejít na úvodní stranu</Link>
      <Link to="/starter">Chci trénovat bez limitu</Link>
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

