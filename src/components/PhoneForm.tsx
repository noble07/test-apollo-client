import { useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_NUMBER } from '../persons/graphql-mutations'

import { useForm } from '../hooks/useForm'
import { Person } from '../types'

interface Props {
  notifyError: (message: string) => void
}

interface updateNumberDetail {
  name: string
  phone: string
}

const PhoneForm = ({notifyError}: Props) => {

  const [changeNumber, {data, error}] = useMutation<{editNumber: Person, person: updateNumberDetail}>(EDIT_NUMBER)

  useEffect(() => {
    if (data && data.editNumber === null) {
      console.error('Person not found')
      notifyError('Person not found')
    }
    
  }, [data])
  

  const [formValues, handleInputChange, reset] = useForm({
    name: '',
    phone: '',
  }) 
  const {name, phone} = formValues

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    changeNumber({variables: {name, phone}})
    reset()
  }

  return (
    <div>
      <h2>Edit Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' type='text' name='name' value={name} onChange={handleInputChange} />
        <input placeholder='Phone' type='text' name='phone' value={phone} onChange={handleInputChange} />
        <button>Change Phone</button>
      </form>
    </div>
  )
}

export default PhoneForm