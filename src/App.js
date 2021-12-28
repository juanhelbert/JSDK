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

  return (
    <div className='App'>
      App
    </div>
  )
}

export default App;
