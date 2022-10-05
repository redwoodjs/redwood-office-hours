import type { EditSpaceshipById, UpdateSpaceshipInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SpaceshipForm from 'src/components/Spaceship/SpaceshipForm'

export const QUERY = gql`
  query EditSpaceshipById($id: Int!) {
    spaceship: spaceship(id: $id) {
      id
      name
      appearsIn
    }
  }
`
const UPDATE_SPACESHIP_MUTATION = gql`
  mutation UpdateSpaceshipMutation($id: Int!, $input: UpdateSpaceshipInput!) {
    updateSpaceship(id: $id, input: $input) {
      id
      name
      appearsIn
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ spaceship }: CellSuccessProps<EditSpaceshipById>) => {
  const [updateSpaceship, { loading, error }] = useMutation(
    UPDATE_SPACESHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Spaceship updated')
        navigate(routes.spaceships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateSpaceshipInput,
    id: EditSpaceshipById['spaceship']['id']
  ) => {
    updateSpaceship({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Spaceship {spaceship?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <SpaceshipForm spaceship={spaceship} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
