import { useApolloClient } from '@apollo/client'
import { Link, routes } from '@redwoodjs/router'
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
      <h3 className="text-md mb-2 font-medium">
        Search People by name or address
      </h3>
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
                    <Link
                      to={routes.person({ id: item.id })}
                      className="text-md p-4 font-medium"
                    >
                      <div> {item.fullName}</div>
                      <div className="font-sm text-gray-500">
                        {item.postalAddress}
                      </div>
                    </Link>
                  )
                },
                noResults() {
                  if (query.length >= 3) {
                    return `No results for '${query}'`
                  }
                  return 'Please enter at least 3 characters to start searching'
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
