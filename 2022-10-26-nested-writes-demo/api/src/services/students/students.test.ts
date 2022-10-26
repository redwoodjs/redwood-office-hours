import type { Student } from '@prisma/client'

import {
  students,
  student,
  createStudent,
  updateStudent,
  deleteStudent,
} from './students'
import type { StandardScenario } from './students.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('students', () => {
  scenario('returns all students', async (scenario: StandardScenario) => {
    const result = await students()

    expect(result.length).toEqual(Object.keys(scenario.student).length)
  })

  scenario('returns a single student', async (scenario: StandardScenario) => {
    const result = await student({ id: scenario.student.one.id })

    expect(result).toEqual(scenario.student.one)
  })

  scenario('creates a student', async () => {
    const result = await createStudent({
      input: { name: 'String', major: 'ARCHITECTURE' },
    })

    expect(result.name).toEqual('String')
    expect(result.major).toEqual('ARCHITECTURE')
  })

  scenario('updates a student', async (scenario: StandardScenario) => {
    const original = (await student({ id: scenario.student.one.id })) as Student
    const result = await updateStudent({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a student', async (scenario: StandardScenario) => {
    const original = (await deleteStudent({
      id: scenario.student.one.id,
    })) as Student
    const result = await student({ id: original.id })

    expect(result).toEqual(null)
  })
})
