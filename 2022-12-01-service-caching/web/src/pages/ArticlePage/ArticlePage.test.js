import { render } from '@redwoodjs/testing/web'

import ArticlePage from './ArticlePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ArticlePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ArticlePage />)
    }).not.toThrow()
  })
})
