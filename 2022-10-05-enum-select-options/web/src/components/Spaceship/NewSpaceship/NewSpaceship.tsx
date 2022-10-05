import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SpaceshipForm from 'src/components/Spaceship/SpaceshipForm'

import type { CreateSpaceshipInput } from 'types/graphql'

const CREATE_SPACESHIP_MUTATION = gql`
  mutation CreateSpaceshipMutation($input: CreateSpaceshipInput!) {
    createSpaceship(input: $input) {
      id
    }
  }
`

const NewSpaceship = () => {
  const [createSpaceship, { loading, error }] = useMutation(
    CREATE_SPACESHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Spaceship created')
        navigate(routes.spaceships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateSpaceshipInput) => {
    createSpaceship({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Spaceship</h2>
      </header>
      <div className="rw-segment-main">
        <SpaceshipForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSpaceship
