import type { Image } from 'types/graphql'

import { routes } from '@redwoodjs/router'

import { canonicalBaseUrl } from 'src/lib/netlify'

export const ogUrl = (to: string) =>
  `${canonicalBaseUrl()}${to}` as 'http://${string}' | 'https://${string}'

export const ogContentUrl = (path: string) => `${canonicalBaseUrl()}${[path]}`

export const ogImageUrl = (image: Image) =>
  ogUrl(
    routes.image({
      id: image.id,
    })
  )

export const ogImageContentUrl = (image: Image) => ogContentUrl(image.src)
