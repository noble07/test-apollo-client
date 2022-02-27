import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { usePersons } from './persons/custom-hooks'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'

import logo from './logo.svg'
import './App.css'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

function App() {

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('phonenumbers-user-token'))
  const {data, loading, error} = usePersons()
  const client = useApolloClient()

  const notifyError = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const logout = async() => {
    setToken(null)
    localStorage.clear()
    await client.clearStore()
  }

  if (error) return <span style={{color: 'red'}}>{error}</span>
  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading 
          ? <p>Loading...</p>
          : <Persons persons={data?.allPersons} />
        }
        {token
          ? <button onClick={logout}>Cerrar Sesión</button> 
          : <LoginForm notifyError={notifyError} setToken={setToken} />}
        <PhoneForm notifyError={notifyError} />
        <PersonForm notifyError={notifyError} />
      </header>
    </div>
  )
}

export default App

