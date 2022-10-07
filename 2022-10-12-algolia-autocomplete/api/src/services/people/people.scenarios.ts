import type { Prisma, Person } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PersonCreateArgs>({
  person: {
    one: { data: { fullName: 'String9388557', postalAddress: 'String' } },
    two: { data: { fullName: 'String3770425', postalAddress: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Person, 'person'>
