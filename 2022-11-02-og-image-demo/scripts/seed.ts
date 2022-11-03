import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const data: Prisma.ImageCreateArgs['data'][] = [
      {
        name: 'Custom-font',
        description: 'Custom-font',
        function: 'custom-font',
        path: '/og/custom-font',
        src: '/og/custom-font',
      },
      {
        name: 'dynamic-image ascorbic',
        description: 'GitHub dynamic-image ascorbic',
        function: 'dynamic-image',
        path: '/og/dynamic-image',
        src: '/og/dynamic-image?username=ascorbic',
      },
      {
        name: 'dynamic-image dthyresson',
        description: 'GitHub dynamic-image dthyresson',
        function: 'dynamic-image',
        path: '/og/dynamic-image',
        src: '/og/dynamic-image?username=dthyresson',
      },
      {
        name: 'dynamic-image RedwoodJS',
        description: 'GitHub dynamic-image redwoodjs',
        function: 'dynamic-image',
        path: '/og/dynamic-image',
        src: '/og/dynamic-image?username=redwoodjs',
      },
      {
        name: 'dynamic-image default',
        description: 'dynamic-image',
        function: 'dynamic-image',
        path: '/og/dynamic-image',
        src: '/og/dynamic-image',
      },
      {
        name: 'Emoji',
        description: 'Shows emoji',
        function: 'emoji',
        path: '/og/emoji',
        src: '/og/emoji',
      },
      {
        name: 'Image-svg',
        description: 'An svg image',
        function: 'image-svg',
        path: '/og/image-svg',
        src: '/og/image-svg',
      },
      {
        name: 'Language',
        description: 'Foreign language',
        function: 'language',
        path: '/og/language',
        src: '/og/language',
      },
      {
        name: 'Param Default',
        description: 'Param with default',
        function: 'param',
        path: '/og/param',
        src: '/og/param',
      },
      {
        name: 'Param with Title',
        description: 'Param with Title',
        function: 'param',
        path: '/og/param',
        src: '/og/param?title=Vercel',
      },
      {
        name: 'Static',
        description: 'Static image',
        function: 'static',
        path: '/og/static',
        src: '/og/static',
      },
      {
        name: 'Tailwind',
        description: 'TailwindCss image example',
        function: 'tailwind',
        path: '/og/tailwind',
        src: '/og/tailwind',
      },
      {
        name: 'Encrypted',
        description: 'Encrypted params with presigned params',
        function: 'encrypted',
        path: '/og/encrypted',
        src: '/og/encrypted?id=a&token=634dd7e46ec814fb105074b73e26755b0d9966c031dca05d7e7cc65a1619058e',
      },
      {
        name: 'Splat/*',
        description: 'Splat',
        function: 'splat',
        path: '/og/splat/splat/*',
        src: '/og/splat/books/123',
      },
      {
        name: 'Pokemon',
        description: 'Pokemon default',
        function: 'pokemon',
        path: '/og/pokemon',
        src: '/og/pokemon',
      },
      {
        name: 'Pokemon with Splat',
        description: 'Pokemon with Splats',
        function: 'pokemon',
        path: '/og/pokemon/p/*',
        src: '/og/pokemon/p/bulbasaur',
      },
      {
        name: 'GraphQL Query',
        description: 'Fetch all image examples via GraphQL',
        function: 'graphql',
        path: '/og/graphql',
        src: '/og/graphql',
      },
    ]

    await db.image.createMany({ data })
  } catch (error) {
    console.warn('Error with seed data.')
    console.error(error)
  }
}
