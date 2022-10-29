import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const data: Prisma.ImageCreateArgs['data'][] = [
      {
        name: 'Custom-font',
        description: 'Custom-font',
        path: '/og/custom-font',
        src: '/og/custom-font',
      },
      {
        name: 'dynamic-image',
        description: 'dynamic-image',
        path: '/og/dynamic-image',
        src: '/og/dynamic-image',
      },
      { name: 'Emoji', description: '', path: '/og/emoji', src: '/og/emoji' },
      {
        name: 'Image-svg',
        description: 'Image-svg',
        path: '/og/image-svg',
        src: '/og/image-svg',
      },
      {
        name: 'Language',
        description: 'Language',
        path: '/og/language',
        src: '/og/language',
      },
      {
        name: 'Param Default',
        description: 'Param Default',
        path: '/og/param',
        src: '/og/param',
      },
      {
        name: 'Param with Title',
        description: 'Param with Title',
        path: '/og/param',
        src: '/og/param?title=Vercel',
      },
      {
        name: 'Static',
        description: 'Static',
        path: '/og/static',
        src: '/og/static',
      },
      {
        name: 'Tailwind',
        description: 'Tailwind',
        path: '/og/tailwind',
        src: '/og/tailwind',
      },
      {
        name: 'Splat/*',
        description: 'Splat/*',
        path: '/og/splat/splat/*',
        src: '/og/splat/books/123',
      },
      {
        name: 'Pokemon',
        description: 'Pokemon',
        path: '/og/pokemon',
        src: '/og/pokemon',
      },
      {
        name: 'Pokemon with Splat',
        description: 'Pokemon with Splat',
        path: '/og/pokemon/p/*',
        src: '/og/pokemon/p/bulbasaur',
      },
    ]

    await db.image.createMany({ data })
  } catch (error) {
    console.warn('Error with seed data.')
    console.error(error)
  }
}
