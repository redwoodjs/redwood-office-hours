import type { Prisma, Subject } from '@prisma/client'
import { db } from 'api/src/lib/db'
import { copycat, fictional } from '@snaplet/copycat'

const RECORDS_TO_SEED = 5

const subjects = [
  'ARCHITECTURE',
  'CHEMISTRY',
  'BIOLOGY',
  'ENGINEERING',
  'HISTORY',
  'HUMANITIES',
  'LITERATURE',
  'MATHEMATICS',
  'MUSIC',
  'PHYSICS',
]

/**
 * Seeds students with Prisma's createMany
 *
 */
const seedStudents = async () => {
  const student = fictional.shape({
    name: copycat.fullName,
    major: copycat.oneOf(subjects) as unknown as Subject,
  })

  const data: Prisma.StudentCreateArgs['data'][] = copycat.times(
    `student`,
    RECORDS_TO_SEED,
    student
  )

  await db.student.createMany({ data, skipDuplicates: true })

  return data
}

/**
 * Seeds courses with Prisma's createMany
 *
 */
const seedCourses = async () => {
  const course = fictional.shape({
    title: copycat.fullName,
    description: copycat.paragraph.options({
      minSentences: 3,
      maxSentences: 7,
    }),
    subject: copycat.oneOf(subjects) as unknown as Subject,
  })

  const data: Prisma.CourseCreateArgs['data'][] = copycat.times(
    `course`,
    RECORDS_TO_SEED,
    course
  )

  await db.course.createMany({ data, skipDuplicates: true })

  return data
}

export default async () => {
  try {
    await seedStudents()
    await seedCourses()
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
