import { render } from '@redwoodjs/testing/web'

import SecurePage from './SecurePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SecurePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SecurePage />)
    }).not.toThrow()
  })
})
