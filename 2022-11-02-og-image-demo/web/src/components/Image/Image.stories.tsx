// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Image> = (args) => {
//   return <Image {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Image from './Image'

export const generated = () => {
  return <Image />
}

export default {
  title: 'Components/Image',
  component: Image,
} as ComponentMeta<typeof Image>
