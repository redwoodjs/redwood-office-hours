import type { ComponentMeta } from '@storybook/react'

import ImagePage from './ImagePage'

export const generated = () => {
  return <ImagePage />
}

export default {
  title: 'Pages/ImagePage',
  component: ImagePage,
} as ComponentMeta<typeof ImagePage>
