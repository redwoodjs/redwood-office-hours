import type { PhotosQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PhotoCard from 'src/components/PhotoCard'

export const QUERY = gql`
  query PhotosQuery {
    photos {
      id
      albumId
      title
      thumbnailUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ photos }: CellSuccessProps<PhotosQuery>) => {
  return (
    <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
      {photos.map((photo) => {
        return <PhotoCard key={photo.id} photo={photo} />
      })}
    </div>
  )
}
