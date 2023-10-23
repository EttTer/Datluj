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

const Starter = () => {
  const [mistakes, setMistakes] = useState(0);
  const [wordsWritten, setWordsWritten] = useState(0);
  const [mistakeWords, setMistakeWords] = useState([]);
  const [mistakesByWord, setMistakesByWord] = useState([0, 0, 0]);
  const [playerName, setPlayerName] = useState("");
  const [wordsLength, setWordsLength] = useState(3);
  const [words, setWords] = useState([...Array(3)].map(() => generateWord(3)));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateNewWords = () => {
    const newWords = [...Array(3)].map(() => generateWord(wordsLength));
    setWords(newWords);
  }


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
        generateNewWords();
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
    setWordsWritten(0);
    setMistakeWords([]);
    setMistakesByWord([0, 0, 0]);
    setPlayerName("");
    setWordsLength(3);
    generateNewWords();
    setIsGameEnded(false);
  };

  const handleGameEnd = () => {
    const playerName = prompt("Please enter your name:");

    if (playerName && playerName.trim() !== "") {
      setPlayerName(playerName);

      setIsGameEnded(true);

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
         projectFirestore.collection("starters").add(firebaseResult);
        console.log("Výsledky hráče byly přidány");
      } catch (error) {
        console.error("Přidání hráče selhalo ", error);
      }

      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (isGameEnded) {
      setIsModalOpen(true);
    }
  }, [isGameEnded]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsGameStarted(prev => !prev); // toggle
  };

  return (
<>
    <div className='Stage_page_container'>
      <button className='Start_page_button'><Link to="/">Úvodní strana</Link></button>
      <button className='Start_page_button'><Link className to="/stage">Hra s časovým limitem</Link></button>
      
      <button className='Start_page_button'><Link to="/result">Výsledky</Link></button></div>
 
   
    <div className="stage">
      <h2 className="stage__mistakes">Chyb: {mistakes}</h2>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox 
            word={word} 
            key={word} 
            onFinish={() => handleFinish(index)} 
            active={index === 0} 
            onMistake={() => handleMistake(index)}  
            wordIndex={index}
          />
        ))}
      </div>
      <div className="stage__buttons">
        {isGameStarted && (
          <button onClick={handleGameEnd}>
            End Game
          </button>
        )}
        {!isGameStarted && (
          <button onClick={restartGame}>Start New Game</button>
        )}
      </div>

      <Modal show={isModalOpen} onHide={handleModalClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Napsal(a) jsi {wordsWritten} slov u dělal(a) v nich  {mistakes} chyb.</p>
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

export default Starter;

/* před použitím popupu import React, { useState, useEffect } from 'react';
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

const Starter = () => {
  const [mistakes, setMistakes] = useState(0);
  const [wordsWritten, setWordsWritten] = useState(0);
  const [mistakeWords, setMistakeWords] = useState([]);
  const [mistakesByWord, setMistakesByWord] = useState([0, 0, 0]);
  const [playerName, setPlayerName] = useState("");
  const [wordsLength, setWordsLength] = useState(3);
  const [words, setWords] = useState([...Array(3)].map(() => generateWord(3)));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  

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
    setWordsWritten(0);
    setMistakeWords([]);
    setMistakesByWord([0, 0, 0]);
    setPlayerName(""); 
    setWordsLength(3);
    setWords([...Array(3)].map(() => generateWord(3)));
    setIsGameEnded(false);
  };

  const handleGameEnd = () => {
    setIsGameEnded(true);
  };

  useEffect(() => {
    if (isGameEnded) {
      let message = `Hra skončila. Napsal(a) jsi ${wordsWritten} slov(a) a přitom jsi udělal(a) ${mistakes} chyb(a). \n\n`;

      if (mistakeWords.length > 0) {
        message += 'Slova s chybou:\n';
        const uniqueMistakeWords = [...new Set(mistakeWords)]; 

        uniqueMistakeWords.forEach((word) => {
          const mistakesInWord = mistakeWords.filter(w => w === word).length;
          message += `Slovo ${word} - ${mistakesInWord} chyb(y)\n`;
        });
      }

      const playerName = prompt("Zadejte své jméno:");

      const result = {
        playerName: playerName,
        wordsWritten: wordsWritten, 
        mistakes: mistakes
      };

      if (playerName && playerName.trim() !== "") {
        const results = JSON.parse(localStorage.getItem("results")) || [];
        results.push(result);
        localStorage.setItem("results", JSON.stringify(results));
      }

      alert(message);
    }
  }, [isGameEnded, wordsWritten, mistakes, mistakeWords]);

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox 
            word={word} 
            key={word} 
            onFinish={() => handleFinish(index)} 
            active={index === 0} 
            onMistake={() => handleMistake(index)}  
            wordIndex={index}
          />
        ))}
      </div>
      <div className="stage__buttons">
        {isGameStarted && (
          <button onClick={handleGameEnd}>
            End Game
          </button>
        )}
        {!isGameStarted && (
          <button onClick={restartGame}>Start New Game</button>
        )}
      </div>
      <Link to="/">Přejít na úvodní stranu</Link>
      <Link to="/stage">Zahrát si hru s časovým limitem</Link>
    </div>
  );
};

export default Starter;*/