import type { FindSpaceshipById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Spaceship from 'src/components/Spaceship/Spaceship'

export const QUERY = gql`
  query FindSpaceshipById($id: Int!) {
    spaceship: spaceship(id: $id) {
      id
      name
      appearsIn
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Spaceship not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ spaceship }: CellSuccessProps<FindSpaceshipById>) => {
  return <Spaceship spaceship={spaceship} />
}
