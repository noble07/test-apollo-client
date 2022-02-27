export interface Address {
  street: string
  city: string
}

export interface Person {
  id: React.Key
  name: string
  phone?: string
  address: Address
}

export interface Login {
  value: string
}

export interface allPersons {
  allPersons: Person[]
}

export interface findPerson {
  findPerson: Person
}

export interface newLoginDetails {
  username: string
  password: string
}

export interface newPersonDetails {
  name: string
  phone: string
  street: string
  city: string
}