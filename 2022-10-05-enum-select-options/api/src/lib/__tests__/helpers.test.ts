import { label } from '../helpers'

describe('label', () => {
  describe('when given a two word enum string', () => {
    it('converts snake_case to Title Case', () => {
      expect(label('new_hope')).toEqual('New Hope')
    })

    it('converts capitalized snake_case to Title Case', () => {
      expect(label('NEW_HOPE')).toEqual('New Hope')
    })
  })

  describe('when given a three word enum string', () => {
    it('converts snake_case to Title Case', () => {
      expect(label('empire_strikes_back')).toEqual('Empire Strikes Back')
    })

    it('converts capitalized snake_case to Title Case', () => {
      expect(label('EMPIRE_STRIKES_BACK')).toEqual('Empire Strikes Back')
    })
  })
})
