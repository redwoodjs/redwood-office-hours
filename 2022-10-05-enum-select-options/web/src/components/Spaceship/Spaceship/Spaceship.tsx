import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import type { DeleteSpaceshipMutationVariables, FindSpaceshipById } from 'types/graphql'

const DELETE_SPACESHIP_MUTATION = gql`
  mutation DeleteSpaceshipMutation($id: Int!) {
    deleteSpaceship(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime?: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}

interface Props {
  spaceship: NonNullable<FindSpaceshipById['spaceship']>
}

const Spaceship = ({ spaceship }: Props) => {
  const [deleteSpaceship] = useMutation(DELETE_SPACESHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Spaceship deleted')
      navigate(routes.spaceships())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteSpaceshipMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete spaceship ' + id + '?')) {
      deleteSpaceship({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Spaceship {spaceship.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{spaceship.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{spaceship.name}</td>
            </tr><tr>
              <th>Appears in</th>
              <td>{formatEnum(spaceship.appearsIn)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSpaceship({ id: spaceship.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(spaceship.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Spaceship
