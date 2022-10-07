import type { FindPeople } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import People from 'src/components/Person/People'

export const QUERY = gql`
  query FindPeople {
    people {
      id
      fullName
      postalAddress
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No people yet. '}
      <Link
        to={routes.newPerson()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ people }: CellSuccessProps<FindPeople>) => {
  return <People people={people} />
}
