import type { ComponentMeta } from '@storybook/react'

import SecurePage from './SecurePage'

export const generated = () => {
  return <SecurePage />
}

export default {
  title: 'Pages/SecurePage',
  component: SecurePage,
} as ComponentMeta<typeof SecurePage>
