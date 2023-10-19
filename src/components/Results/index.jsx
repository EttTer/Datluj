import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

import { projectFirestore } from "../../firebase/config";
import {useState,useEffect} from "react"

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



  return (<>
  <div> {error && <p> {error}</p>}</div>
    <div>{data.map((onePlayer)=>{
        const {id, playerName, mistakes, wordsWritten} = onePlayer
        return <div key={id}>
        <p>{playerName}</p>
        <p>{mistakes}</p>
        <p>{wordsWritten}</p>

        </div>
    })}
    <Link to="/stage">Přejít na Stage</Link>
    <Link to="/starter">Přejít na Starter</Link>
    <Link to="/">Domů</Link>
    </div>
</>
  )
}

export default Result