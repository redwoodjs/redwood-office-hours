import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const characters: QueryResolvers['characters'] = () => {
  return db.character.findMany({ orderBy: { name: 'asc' } })
}

export const character: QueryResolvers['character'] = ({ id }) => {
  return db.character.findUnique({
    where: { id },
  })
}

export const createCharacter: MutationResolvers['createCharacter'] = ({
  input,
}) => {
  return db.character.create({
    data: input,
  })
}

export const updateCharacter: MutationResolvers['updateCharacter'] = ({
  id,
  input,
}) => {
  return db.character.update({
    data: input,
    where: { id },
  })
}

export const deleteCharacter: MutationResolvers['deleteCharacter'] = ({
  id,
}) => {
  return db.character.delete({
    where: { id },
  })
}
