export const schema = gql`
  type Character {
    id: Int!
    name: String!
    appearsIn: [Episode]!
  }

  enum Episode {
    NEW_HOPE
    EMPIRE_STRIKES_BACK
    RETURN_OF_THE_JEDI
    ROGUE_ONE
  }

  type Query {
    characters: [Character!]! @requireAuth
    character(id: Int!): Character @requireAuth
  }

  input CreateCharacterInput {
    name: String!
    appearsIn: [Episode]!
  }

  input UpdateCharacterInput {
    name: String
    appearsIn: [Episode]!
  }

  type Mutation {
    createCharacter(input: CreateCharacterInput!): Character! @requireAuth
    updateCharacter(id: Int!, input: UpdateCharacterInput!): Character!
      @requireAuth
    deleteCharacter(id: Int!): Character! @requireAuth
  }
`
