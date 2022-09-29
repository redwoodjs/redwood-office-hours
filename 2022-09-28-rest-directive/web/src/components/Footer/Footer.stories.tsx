// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Footer> = (args) => {
//   return <Footer {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Footer from './Footer'

export const generated = () => {
  return <Footer />
}

export default {
  title: 'Components/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>
