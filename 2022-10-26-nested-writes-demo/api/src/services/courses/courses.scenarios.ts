import type { Prisma, Course } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CourseCreateArgs>({
  course: {
    one: {
      data: {
        title: 'String1525128',
        description: 'String',
        subject: 'ARCHITECTURE',
      },
    },
    two: {
      data: {
        title: 'String5882590',
        description: 'String',
        subject: 'ARCHITECTURE',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Course, 'course'>
