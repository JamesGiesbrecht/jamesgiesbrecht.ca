import React, { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'

const App = () => {
  const [apiRes, setApiRes] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        console.log(response)
        setApiRes(response.data.message)
      })
      .catch((error) => {
        console.log(error)
        setApiRes('An error occured')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{isLoading ? 'Loading...' : apiRes}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
