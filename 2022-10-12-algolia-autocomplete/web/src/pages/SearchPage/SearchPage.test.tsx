import { render } from '@redwoodjs/testing/web'

import SearchPage from './SearchPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SearchPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchPage />)
    }).not.toThrow()
  })
})
