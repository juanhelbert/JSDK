import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { InitialSearch } from './scenes'
import { Results } from './scenes/Results'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.css'

const client = new ApolloClient({
  // TODO: fix this
  uri: 'https://app-beta.suredone.com/public/fitment/graphql',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InitialSearch />} />
          <Route path='/:p1' element={<InitialSearch />} />
          <Route path='/:p1/:p2' element={<InitialSearch />} />
          <Route path='/:p1/result' element={<Results />} />
          <Route path='/:p1/:p2/result' element={<Results />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
