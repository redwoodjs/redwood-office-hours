import type { FindSecretQuery, FindSecretQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindSecretQuery {
    secret {
      message
      password
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSecretQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  secret,
}: CellSuccessProps<FindSecretQuery, FindSecretQueryVariables>) => {
  return <div>{JSON.stringify(secret)}</div>
}
