export const schema = gql`
  type Secret {
    message: String!
  }
  type Query {
    secret: Secret! @requireAuth
  }
`
