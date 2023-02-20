import type { Prisma, Profile } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProfileCreateArgs>({
  profile: {
    one: {
      data: {
        email: 'Wayne Gretzky',
        name: 'String',
        birthday: '1961-01-26T00:00:00.000Z',
      },
    },
    two: {
      data: {
        email: 'Lewis Hamilton',
        name: 'String',
        birthday: '1985-01-05T00:00:00.000Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Profile, 'profile'>
