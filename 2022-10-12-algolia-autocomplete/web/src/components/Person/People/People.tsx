import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Person/PeopleCell'
import { truncate } from 'src/lib/formatters'

import type { DeletePersonMutationVariables, FindPeople } from 'types/graphql'

const DELETE_PERSON_MUTATION = gql`
  mutation DeletePersonMutation($id: Int!) {
    deletePerson(id: $id) {
      id
    }
  }
`

const PeopleList = ({ people }: FindPeople) => {
  const [deletePerson] = useMutation(DELETE_PERSON_MUTATION, {
    onCompleted: () => {
      toast.success('Person deleted')
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

  const onDeleteClick = (id: DeletePersonMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete person ' + id + '?')) {
      deletePerson({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Full name</th>
            <th>Postal address</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{truncate(person.id)}</td>
              <td>{truncate(person.fullName)}</td>
              <td>{truncate(person.postalAddress)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.person({ id: person.id })}
                    title={'Show person ' + person.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPerson({ id: person.id })}
                    title={'Edit person ' + person.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete person ' + person.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(person.id)}
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

export default PeopleList
