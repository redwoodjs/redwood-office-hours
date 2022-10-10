import type { FindPersonById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Person from 'src/components/Person/Person'

export const QUERY = gql`
  query FindPersonById($id: Int!) {
    person: person(id: $id) {
      id
      fullName
      postalAddress
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Person not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ person }: CellSuccessProps<FindPersonById>) => {
  return <Person person={person} />
}
