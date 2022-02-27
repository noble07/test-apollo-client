import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useForm } from '../hooks/useForm'

import { LOGIN } from '../login/graphql-mutation'
import { Login, newLoginDetails } from '../types'

interface Props {
  notifyError: (message: string) => void
  setToken: React.Dispatch<React.SetStateAction<string | null>>
}

const LoginForm = ({notifyError, setToken}: Props) => {
  
  const [{username, password}, handleInputChange, reset] = useForm({
    username: '',
    password: ''
  })

  const [login, {data}] = useMutation<{login: Login, newlogin: newLoginDetails}>(LOGIN, {
    onError: error => {
      notifyError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (data) {
      const {value: token} = data.login
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [data])
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({variables: {username, password}})
    reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username <input name='username' value={username} onChange={handleInputChange} />
        </div>
        <div>
          password <input name='password' type='password' value={password} onChange={handleInputChange} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm