import { gql } from "@apollo/client";

export const ADD_PERSON = gql`
  mutation addPerson($name: String!, $phone: String, $street: String!, $city: String!) {
    addPerson(name: $name, phone: $phone, street: $street, city: $city) {
      name
      phone
      address {
        city
        street
      }
      id
    }
  }
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      id
      name
      phone
    }
  }
`