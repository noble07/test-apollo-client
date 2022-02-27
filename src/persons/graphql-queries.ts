import { gql } from '@apollo/client';

export const GET_PERSONS = gql`
  query getPersons {
    allPersons {
      id
      name
      phone
      address {
        city
        street
      }
    }
  }
`

export const FIND_PERSON = gql`
  query findPerson($name: String!) {
    findPerson(name: $name) {
      id
      name
      phone
      address {
        city
        street
      }
    }
  }
`