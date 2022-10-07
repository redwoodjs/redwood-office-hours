import { useApolloClient } from '@apollo/client'

import { Autocomplete, debounced } from '../Autocomplete/Autocomplete'
import type { AutocompleteProps } from '../Autocomplete/Autocomplete'

const QUERY = gql`
  query AutocompletePeople($input: AutocompleteInput) {
    response: autocomplete(input: $input) {
      id
      fullName
      postalAddress
    }
  }
`

const getPeople = ({ props }: { props: AutocompleteProps }) => {
  return props.client
    .query({
      query: QUERY,
      variables: {
        input: { query: props.query },
      },
    })
    .then((result) => {
      return result.data.response
    })
}

const PersonAutocomplete = (criteria: Partial<AutocompleteProps>) => {
  const client = useApolloClient()

  return (
    <div className="mb-4">
      <h3 className="text-md mb-2 font-medium">Search</h3>
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }) => {
          return debounced([
            {
              sourceId: 'people',
              getItems() {
                if (query.length >= 3) {
                  return getPeople({
                    props: { client, query },
                  })
                }
                return []
              },
              templates: {
                item({ item }) {
                  return (
                    <div className="text-md p-4 font-medium">
                      <div> {item.fullName}</div>
                      <div className="font-sm text-gray-500">
                        {item.postalAddress}
                      </div>
                    </div>
                  )
                },
                noResults() {
                  return 'No results.'
                },
              },
            },
          ])
        }}
      />
    </div>
  )
}

export default PersonAutocomplete
