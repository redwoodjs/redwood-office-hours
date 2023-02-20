export const schema = gql`
  type Profile {
    id: Int!
    email: String! @maskedEmail @uppercase
    name: String!
    birthday: DateTime! @yearOnly
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: Int!): Profile @requireAuth
  }

  input CreateProfileInput {
    email: String!
    name: String!
    birthday: DateTime!
  }

  input UpdateProfileInput {
    email: String
    name: String
    birthday: DateTime
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(id: Int!, input: UpdateProfileInput!): Profile! @requireAuth
    deleteProfile(id: Int!): Profile! @requireAuth
  }
`
