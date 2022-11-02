export const schema = gql`
  type Image {
    id: Int!
    name: String!
    description: String!
    path: String!
    function: String!
    src: String!
  }

  type Query {
    images: [Image!]! @requireAuth
    image(id: Int!): Image @requireAuth
  }

  input CreateImageInput {
    name: String!
    description: String!
    path: String!
    function: String!
    src: String!
  }

  input UpdateImageInput {
    name: String
    description: String
    path: String
    function: String
    src: String
  }

  type Mutation {
    createImage(input: CreateImageInput!): Image! @requireAuth
    updateImage(id: Int!, input: UpdateImageInput!): Image! @requireAuth
    deleteImage(id: Int!): Image! @requireAuth
  }
`
