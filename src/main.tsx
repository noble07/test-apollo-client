import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'

const getAuth = () => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return token ? `bearer ${token}` : null
}

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      authorization: getAuth()
    },
    uri: import.meta.env.VITE_APOLLO_SERVER
  })
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
