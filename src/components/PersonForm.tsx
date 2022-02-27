import { useMutation } from '@apollo/client'

import { ADD_PERSON } from '../persons/graphql-mutations'
import { GET_PERSONS } from '../persons/graphql-queries'

import { useForm } from '../hooks/useForm'
import { allPersons, newPersonDetails, Person } from '../types'

interface Props {
  notifyError: (message: string) => void
}

const PersonForm = ({notifyError}: Props) => {

  const [createPerson] = useMutation<{savePerson: Person, person: newPersonDetails}>(ADD_PERSON, {
    onError: error => {
      notifyError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery<allPersons>({query: GET_PERSONS})
      store.writeQuery({
        query: GET_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [
            ...dataInStore?.allPersons,
            response.data?.savePerson
          ]
        }
      })
    }
  })

  const [formValues, handleInputChange, reset] = useForm({
    name: '',
    phone: '',
    street: '',
    city: ''
  }) 
  const {name, phone, street, city} = formValues

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createPerson({
      variables: {...formValues}
    })
    reset()
  }

  return (
    <div>
      <h2>Create new Person</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' type='text' name='name' value={name} onChange={handleInputChange} />
        <input placeholder='Phone' type='text' name='phone' value={phone} onChange={handleInputChange} />
        <input placeholder='Street' type='text' name='street' value={street} onChange={handleInputChange} />
        <input placeholder='City' type='text' name='city' value={city} onChange={handleInputChange} />
        <button>Add Person</button>
      </form>
    </div>
  )
}

export default PersonForm