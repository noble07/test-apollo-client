import { useQuery } from "@apollo/client"
import { allPersons } from "../types"
import { GET_PERSONS } from "./graphql-queries"

export const usePersons = () => {
  const result = useQuery<allPersons>(GET_PERSONS)
  return result
}