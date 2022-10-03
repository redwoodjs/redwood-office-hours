import type { FindCharacterById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Character from 'src/components/Character/Character'

export const QUERY = gql`
  query FindCharacterById($id: Int!) {
    character: character(id: $id) {
      id
      name
      appearsIn
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Character not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ character }: CellSuccessProps<FindCharacterById>) => {
  return <Character character={character} />
}
