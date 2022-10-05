import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const spaceships: QueryResolvers['spaceships'] = () => {
  return db.spaceship.findMany()
}

export const spaceship: QueryResolvers['spaceship'] = ({ id }) => {
  return db.spaceship.findUnique({
    where: { id },
  })
}

export const createSpaceship: MutationResolvers['createSpaceship'] = ({
  input,
}) => {
  return db.spaceship.create({
    data: input,
  })
}

export const updateSpaceship: MutationResolvers['updateSpaceship'] = ({
  id,
  input,
}) => {
  return db.spaceship.update({
    data: input,
    where: { id },
  })
}

export const deleteSpaceship: MutationResolvers['deleteSpaceship'] = ({
  id,
}) => {
  return db.spaceship.delete({
    where: { id },
  })
}
