import type { ComponentMeta } from '@storybook/react'

import SearchPage from './SearchPage'

export const generated = () => {
  return <SearchPage />
}

export default {
  title: 'Pages/SearchPage',
  component: SearchPage,
} as ComponentMeta<typeof SearchPage>
