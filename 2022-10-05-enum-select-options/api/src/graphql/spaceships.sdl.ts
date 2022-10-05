export const schema = gql`
  type Spaceship {
    id: Int!
    name: String!
    appearsIn: [Episode]!
  }

  type Query {
    spaceships: [Spaceship!]! @requireAuth
    spaceship(id: Int!): Spaceship @requireAuth
  }

  input CreateSpaceshipInput {
    name: String!
    appearsIn: [Episode]!
  }

  input UpdateSpaceshipInput {
    name: String
    appearsIn: [Episode]!
  }

  type Mutation {
    createSpaceship(input: CreateSpaceshipInput!): Spaceship! @requireAuth
    updateSpaceship(id: Int!, input: UpdateSpaceshipInput!): Spaceship!
      @requireAuth
    deleteSpaceship(id: Int!): Spaceship! @requireAuth
  }
`
