import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom'

const Results = () => {
  const location = useLocation()
  console.log({ location })
  return (<>
    <h1>Results</h1>
    <Link to='/televisions'>Back</Link>
  </>)
}

const Search = () => <>
  <h1>Search</h1>
  <Link to='/televisions'>Back</Link>
</>

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='televisions' element={<App />}>
        </Route>
        <Route path='televisions/result' element={<Results />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
