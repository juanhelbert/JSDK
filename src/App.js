import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './App.css'

function App() {
  const [data, setData] = useState()

  const fetchData = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => setData(data?.message))
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log({ data })

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ cursor: 'pointer' }} onClick={() => alert('🐕🦴🥏')}>🐶</h1>
        {data ? <img src={data} className="dog" alt="logo" /> : 'Loading...'}
        <Link to='result?filters={"color":null,"make":"Chevrolet","model":"Colorado","page":0,"year":"2009"}'>Make query</Link>
      </header>
    </div>
  );
}

export default App;
