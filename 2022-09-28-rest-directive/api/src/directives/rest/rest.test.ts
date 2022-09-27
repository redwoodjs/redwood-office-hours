import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import rest from './rest'

describe('rest directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(rest.schema).toBeTruthy()
    expect(getDirectiveName(rest.schema)).toBe('rest')
  })

  it('has a rest implementation transforms the value', () => {
    const mockExecution = mockRedwoodDirective(rest, {
      mockedResolvedValue: 'foo',
    })

    expect(mockExecution()).toBe('bar')
  })
})
