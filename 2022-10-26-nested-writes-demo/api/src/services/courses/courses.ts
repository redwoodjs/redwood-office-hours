import type {
  QueryResolvers,
  MutationResolvers,
  CourseRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const courses: QueryResolvers['courses'] = () => {
  return db.course.findMany()
}

export const course: QueryResolvers['course'] = ({ id }) => {
  return db.course.findUnique({
    where: { id },
  })
}

export const createCourse: MutationResolvers['createCourse'] = ({ input }) => {
  return db.course.create({
    data: input,
  })
}

export const updateCourse: MutationResolvers['updateCourse'] = ({
  id,
  input,
}) => {
  return db.course.update({
    data: input,
    where: { id },
  })
}

export const deleteCourse: MutationResolvers['deleteCourse'] = ({ id }) => {
  return db.course.delete({
    where: { id },
  })
}

export const Course: CourseRelationResolvers = {
  students: (_obj, { root }) => {
    return db.course.findUnique({ where: { id: root?.id } }).students()
  },
}
