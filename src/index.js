import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const Results = () => <>
<h1>Results</h1>
<Link to='/'>Search</Link>
</>

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path='/televisions' element={<App />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
