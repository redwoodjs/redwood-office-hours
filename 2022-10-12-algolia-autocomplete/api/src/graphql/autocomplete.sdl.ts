export const schema = gql`
  input AutocompleteInput {
    query: String!
  }

  type Query {
    autocomplete(input: AutocompleteInput): [Person!]! @requireAuth
  }
`
