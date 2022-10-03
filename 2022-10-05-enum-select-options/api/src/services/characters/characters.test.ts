import type { Character } from '@prisma/client'

import {
  characters,
  character,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from './characters'
import type { StandardScenario } from './characters.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('characters', () => {
  scenario('returns all characters', async (scenario: StandardScenario) => {
    const result = await characters()

    expect(result.length).toEqual(Object.keys(scenario.character).length)
  })

  scenario('returns a single character', async (scenario: StandardScenario) => {
    const result = await character({ id: scenario.character.one.id })

    expect(result).toEqual(scenario.character.one)
  })

  scenario('creates a character', async () => {
    const result = await createCharacter({
      input: { name: 'String4921289', appearsIn: 'NEW_HOPE' },
    })

    expect(result.name).toEqual('String4921289')
    expect(result.appearsIn).toEqual('NEW_HOPE')
  })

  scenario('updates a character', async (scenario: StandardScenario) => {
    const original = (await character({
      id: scenario.character.one.id,
    })) as Character
    const result = await updateCharacter({
      id: original.id,
      input: { name: 'String61976612' },
    })

    expect(result.name).toEqual('String61976612')
  })

  scenario('deletes a character', async (scenario: StandardScenario) => {
    const original = (await deleteCharacter({
      id: scenario.character.one.id,
    })) as Character
    const result = await character({ id: original.id })

    expect(result).toEqual(null)
  })
})
