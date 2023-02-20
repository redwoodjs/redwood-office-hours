import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import uppercase from './uppercase'

describe('uppercase directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(uppercase.schema).toBeTruthy()
    expect(getDirectiveName(uppercase.schema)).toBe('uppercase')
  })

  it('has a uppercase implementation transforms the value', () => {
    const mockExecution = mockRedwoodDirective(uppercase, {
      mockedResolvedValue: 'foo',
    })

    expect(mockExecution()).toBe('FOO')
  })
})
