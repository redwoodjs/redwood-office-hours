import { render } from '@redwoodjs/testing/web'

import ImagePage from './ImagePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ImagePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImagePage />)
    }).not.toThrow()
  })
})
