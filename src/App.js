import React, { useState, useEffect } from 'react';
import './App.css';

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
      </header>
    </div>
  );
}

export default App;
