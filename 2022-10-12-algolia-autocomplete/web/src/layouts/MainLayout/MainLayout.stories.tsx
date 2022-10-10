import type { ComponentMeta, ComponentStory } from '@storybook/react'

import MainLayout from './MainLayout'

export const generated: ComponentStory<typeof MainLayout> = (args) => {
  return <MainLayout {...args} />
}

export default {
  title: 'Layouts/MainLayout',
  component: MainLayout,
} as ComponentMeta<typeof MainLayout>
