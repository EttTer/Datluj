import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

import { projectFirestore } from "../../firebase/config";
import {useState,useEffect} from "react"



const Result = () => {
    const [playersData, setPlayersData] = useState([]);
    const [startersData, setStartersData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        projectFirestore.collection("players").get().then((snapshot) => {
            if (snapshot.empty) {
                setError("Ještě nikdo nehrál");
            } else {
                let result = [];
                snapshot.docs.forEach((onePlayer) => {
                    result.push({ id: onePlayer.id, ...onePlayer.data() });
                });
                setPlayersData(result);
            }
        }).catch((err) => {
            setError(err.message);
        });
    }, []);

    useEffect(() => {
        projectFirestore.collection("starters").get().then((snapshot) => {
            if (!snapshot.empty) {
                let result = [];
                snapshot.docs.forEach((oneStarter) => {
                    result.push({ id: oneStarter.id, ...oneStarter.data() });
                });
                setStartersData(result);
            }
        }).catch((err) => {
            setError(err.message);
        });
    }, []);

    const sortedPlayersData = [...playersData].sort((a, b) => (b.wordsWritten - b.mistakes) - (a.wordsWritten - a.mistakes));
    const sortedStartersData = [...startersData].sort((a, b) => (b.wordsWritten - b.mistakes) - (a.wordsWritten - a.mistakes));

    return (
        <>
            <div> {error && <p> {error}</p>}</div>
            <div>
                <div>
                    <h2>Players</h2>
                    {sortedPlayersData.map((onePlayer) => {
                        const { id, playerName, mistakes, wordsWritten } = onePlayer;
                        const difference = wordsWritten - mistakes;
                        return (
                            <div key={id}>
                                <p>{playerName}</p>
                                <p>Mistakes: {mistakes}</p>
                                <p>Words Written: {wordsWritten}</p>
                                <p>WordsWritten - Mistakes: {difference}</p>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h2>Starters</h2>
                    {sortedStartersData.map((oneStarter) => {
                        const { id, playerName, mistakes, wordsWritten } = oneStarter;
                        const difference = wordsWritten - mistakes;
                        return (
                            <div key={id}>
                                <p>{playerName}</p>
                                <p>Mistakes: {mistakes}</p>
                                <p>Words Written: {wordsWritten}</p>
                                <p>WordsWritten - Mistakes: {difference}</p>
                            </div>
                        );
                    })}
                </div>
                <Link to="/stage">Přejít na Stage</Link>
                <Link to="/starter">Přejít na Starter</Link>
                <Link to="/">Domů</Link>
            </div>
        </>
    );
}

export default Result;









/*   výpis pouze z jedné kolekce s časovačem
const Result = () => {

    const [data,setData] = useState([])
    const [error,setError]=useState(false)

    useEffect(()=>{
    projectFirestore.collection("players").get().then((snapshot)=>{
        console.log(snapshot)
    if (snapshot.empty) {setError ("Ještě nikdo nehrál")
}
    else {
let result =  []
snapshot.docs.forEach((onePlayer)=>{
    result.push ( {id:onePlayer.id, ...onePlayer.data()})
})
setData(result)
}

  }).catch((err)=>{
    setError(err.message)
  })
    }
    , [])





   const sortedData = [...data].sort((a, b) => (b.wordsWritten - b.mistakes) - (a.wordsWritten - a.mistakes));
console.log(sortedData)
    return (
        <>
        <div> {error && <p> {error}</p>}</div>
        <div>
          {sortedData.map((onePlayer) => {
            const { id, playerName, mistakes, wordsWritten } = onePlayer;
            const difference = wordsWritten - mistakes; // Rozdíl wordsWritten a mistakes
            return (
              <div key={id}>
                <p>{playerName}</p>
                <p>Mistakes: {mistakes}</p>
                <p>Words Written: {wordsWritten}</p>
                <p>WordsWritten - Mistakes: {difference}</p> 
              </div>
            );
          })}
      
    
    <Link to="/stage">Přejít na Stage</Link>
    <Link to="/starter">Přejít na Starter</Link>
    <Link to="/">Domů</Link>
        </div>
      </>
    );

  
}

export default Result */