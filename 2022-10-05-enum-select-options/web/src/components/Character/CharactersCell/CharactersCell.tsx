import type { FindCharacters } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Characters from 'src/components/Character/Characters'

export const QUERY = gql`
  query FindCharacters {
    characters {
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
      {'No characters yet. '}
      <Link
        to={routes.newCharacter()}
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

export const Success = ({ characters }: CellSuccessProps<FindCharacters>) => {
  return <Characters characters={characters} />
}
