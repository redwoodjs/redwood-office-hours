import type { FindSpaceships } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Spaceships from 'src/components/Spaceship/Spaceships'

export const QUERY = gql`
  query FindSpaceships {
    spaceships {
      id
      name
      appearsIn
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No spaceships yet. '}
      <Link
        to={routes.newSpaceship()}
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

export const Success = ({ spaceships }: CellSuccessProps<FindSpaceships>) => {
  return <Spaceships spaceships={spaceships} />
}
