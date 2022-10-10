import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const people: QueryResolvers['people'] = () => {
  // We loaded 100,000 people so scaffold lists can't show them all
  return db.person.findMany({ take: 100 })
}

export const person: QueryResolvers['person'] = ({ id }) => {
  return db.person.findUnique({
    where: { id },
  })
}

export const createPerson: MutationResolvers['createPerson'] = ({ input }) => {
  return db.person.create({
    data: input,
  })
}

export const updatePerson: MutationResolvers['updatePerson'] = ({
  id,
  input,
}) => {
  return db.person.update({
    data: input,
    where: { id },
  })
}

export const deletePerson: MutationResolvers['deletePerson'] = ({ id }) => {
  return db.person.delete({
    where: { id },
  })
}
