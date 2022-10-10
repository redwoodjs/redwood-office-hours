export const schema = gql`
  type Person {
    id: Int!
    fullName: String!
    postalAddress: String!
  }

  type Query {
    people: [Person!]! @requireAuth
    person(id: Int!): Person @requireAuth
  }

  input CreatePersonInput {
    fullName: String!
    postalAddress: String!
  }

  input UpdatePersonInput {
    fullName: String
    postalAddress: String
  }

  type Mutation {
    createPerson(input: CreatePersonInput!): Person! @requireAuth
    updatePerson(id: Int!, input: UpdatePersonInput!): Person! @requireAuth
    deletePerson(id: Int!): Person! @requireAuth
  }
`
