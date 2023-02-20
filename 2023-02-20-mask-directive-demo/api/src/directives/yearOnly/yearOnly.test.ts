import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import yearOnly from './yearOnly'

describe('yearOnly directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(yearOnly.schema).toBeTruthy()
    expect(getDirectiveName(yearOnly.schema)).toBe('yearOnly')
  })

  it('has a yearOnly implementation transforms the value', () => {
    const mockExecution = mockRedwoodDirective(yearOnly, {
      mockedResolvedValue: new Date(Date.parse('1996-09-09T09:01:16.000Z')),
    })

    expect(mockExecution()).toEqual(
      new Date(Date.parse('1996-01-01T00:00:00.000Z'))
    )
  })
})
