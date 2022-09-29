import type { FindPhotoQuery, FindPhotoQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PhotoCard from 'src/components/PhotoCard'

export const QUERY = gql`
  query FindPhotoQuery($id: Int!) {
    photo: photo(id: $id) {
      id
      albumId
      title
      thumbnailUrl
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPhotoQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  photo,
}: CellSuccessProps<FindPhotoQuery, FindPhotoQueryVariables>) => {
  return <PhotoCard photo={photo} />
}
