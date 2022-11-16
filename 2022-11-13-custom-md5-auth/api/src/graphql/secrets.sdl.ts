export const schema = gql`
  type Secret {
    message: String!
    password: String!
  }
  type Query {
    secret: Secret! @requireAuth
  }
`
