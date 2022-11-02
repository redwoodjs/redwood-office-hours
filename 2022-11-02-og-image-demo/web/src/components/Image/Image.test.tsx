import { render } from '@redwoodjs/testing/web'

import Image from './Image'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Image', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Image />)
    }).not.toThrow()
  })
})
