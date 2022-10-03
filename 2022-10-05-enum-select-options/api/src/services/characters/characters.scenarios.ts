import type { Prisma, Character } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CharacterCreateArgs>({
  character: {
    one: { data: { name: 'String6001711', appearsIn: 'NEW_HOPE' } },
    two: { data: { name: 'String9991932', appearsIn: 'NEW_HOPE' } },
  },
})

export type StandardScenario = ScenarioData<Character, 'character'>
