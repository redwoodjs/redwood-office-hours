import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const launchCourse: MutationResolvers['launchCourse'] = ({ input }) => {
  return db.course.create({
    data: { ...input.course, students: { connect: input.studentIds } },
    include: { students: true },
  })
}
