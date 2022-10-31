import type { FindImageQuery, FindImageQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { MetaTags } from '@redwoodjs/web'
import { ogImageUrl, ogImageContentUrl } from 'src/lib/seo'
import Image from 'src/components/Image/Image'

export const QUERY = gql`
  query FindImageQuery($id: Int!) {
    image: image(id: $id) {
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

export const Failure = ({
  error,
}: CellFailureProps<FindImageQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  image,
}: CellSuccessProps<FindImageQuery, FindImageQueryVariables>) => {
  return (
    <>
      <MetaTags
        title={image.name}
        description={image.description}
        ogUrl={ogImageUrl(image)}
        ogContentUrl={ogImageContentUrl(image)}
      />
      <Image image={image} />
    </>
  )
}
