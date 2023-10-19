import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const Result = () => {
  return (<>
    <div>index
    <Link to="/stage">Přejít na Stage</Link>
    <Link to="/starter">Přejít na Starter</Link>
    <Link to="/">Domů</Link>
    </div>
</>
  )
}

export default Result