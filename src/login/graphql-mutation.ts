import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation editNumber($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`