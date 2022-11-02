import type { Prisma, Image } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageCreateArgs>({
  image: {
    one: {
      data: {
        name: 'String8618335',
        description: 'String',
        path: 'String',
        src: 'String',
      },
    },
    two: {
      data: {
        name: 'String142893',
        description: 'String',
        path: 'String',
        src: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Image, 'image'>
