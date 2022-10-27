import type { Prisma, Student } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.StudentCreateArgs>({
  student: {
    one: { data: { name: 'String', major: 'ARCHITECTURE' } },
    two: { data: { name: 'String', major: 'ARCHITECTURE' } },
  },
})

export type StandardScenario = ScenarioData<Student, 'student'>
