import type { FindImageQuery, FindImageQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { MetaTags } from '@redwoodjs/web'
import { routes } from '@redwoodjs/router'

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
  let canonicalBaseUrl = process.env.URL

  if (process.env.NETLIFY === 'true') {
    if (process.env.branch === 'main') {
      canonicalBaseUrl = process.env.URL
    } else {
      canonicalBaseUrl = process.env.DEPLOY_URL
    }
  }

  const ogUrl = `${canonicalBaseUrl}${routes.image({
    id: image.id,
  })}` as 'http://${string}' | 'https://${string}'
  const ogContentUrl = `${canonicalBaseUrl}${image.src}`
  return (
    <>
      <MetaTags
        title={image.name}
        description={image.description}
        ogUrl={ogUrl}
        ogContentUrl={ogContentUrl}
      />
      <Image image={image} />
    </>
  )
}
