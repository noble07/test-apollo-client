import { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client"

import { FIND_PERSON } from "../persons/graphql-queries"

import { findPerson, Person } from "../types"

interface Props {
  persons?: Person[]
}

const Persons = ({persons}: Props) => {

  const [getPerson, {data}] = useLazyQuery<findPerson>(FIND_PERSON)
  const [person, setPerson] = useState<Person | null>(null)

  useEffect(() => {
    if (data) {
      setPerson(data.findPerson)
    }    
  }, [data])
  

  const showPerson = (name: String) => {
    getPerson({
      variables: {
        name
      }
    })
  }

  if(person) return (
    <div>
      <h2>{person.name}</h2>
      <div>{person.address.street}, {person.address.city}</div>
      <div>{person.phone}</div>
      <button onClick={() => setPerson(null)}>Close</button>
    </div>
  )

  if (persons === null ) return null

  return (
    <div>
      <h2>Persons</h2>
      {persons?.map(person => <div onClick={() => {showPerson(person.name)}} key={person.id}>
        {person.name} {person.phone}
      </div>)}
    </div>
  )
}

export default Persons