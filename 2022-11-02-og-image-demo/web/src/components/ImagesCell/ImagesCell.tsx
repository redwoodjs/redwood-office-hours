import type { ImagesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'
import Image from 'src/components/Image/Image'

export const QUERY = gql`
  query ImagesQuery {
    images {
      id
      name
      description
      function
      path
      src
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ images }: CellSuccessProps<ImagesQuery>) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((example) => {
        return (
          <Link key={example.id} to={routes.image({ id: example.id })}>
            <Image image={example} />
          </Link>
        )
      })}
    </ul>
  )
}
