import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Spaceship/SpaceshipsCell'

import type { DeleteSpaceshipMutationVariables, FindSpaceships } from 'types/graphql'

const DELETE_SPACESHIP_MUTATION = gql`
  mutation DeleteSpaceshipMutation($id: Int!) {
    deleteSpaceship(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (value: string | number) => {
  const output = value?.toString()
  if (output?.length > MAX_STRING_LENGTH) {
    return output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output ?? ''
}


const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const SpaceshipsList = ({ spaceships }: FindSpaceships) => {
  const [deleteSpaceship] = useMutation(DELETE_SPACESHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Spaceship deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteSpaceshipMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete spaceship ' + id + '?')) {
      deleteSpaceship({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Appears in</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {spaceships.map((spaceship) => (
            <tr key={spaceship.id}>
              <td>{truncate(spaceship.id)}</td>
              <td>{truncate(spaceship.name)}</td>
              <td>{formatEnum(spaceship.appearsIn)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.spaceship({ id: spaceship.id })}
                    title={'Show spaceship ' + spaceship.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSpaceship({ id: spaceship.id })}
                    title={'Edit spaceship ' + spaceship.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete spaceship ' + spaceship.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(spaceship.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SpaceshipsList
