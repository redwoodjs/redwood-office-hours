import type { QueryResolvers, MutationResolvers } from 'types/graphql'
import { Prisma } from '@prisma/client'
import { RedwoodError } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const characters: QueryResolvers['characters'] = () => {
  return db.character.findMany({ orderBy: { name: 'asc' } })
}

export const character: QueryResolvers['character'] = ({ id }) => {
  return db.character.findUnique({
    where: { id },
  })
}

export const createCharacter: MutationResolvers['createCharacter'] = async ({
  input,
}) => {
  try {
    return await db.character.create({
      data: input,
    })
  } catch (e) {
    logger.error(e, 'Error creating character')

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // P2022: Unique constraint failed
      // Prisma error codes: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
      if (e.code === 'P2002') {
        logger.error('The character already exists', e)
        throw new RedwoodError('The character already exists')
      }
    }
    throw e
  }
}

export const updateCharacter: MutationResolvers['updateCharacter'] = async ({
  id,
  input,
}) => {
  try {
    return await db.character.update({
      data: input,
      where: { id },
    })
  } catch (e) {
    logger.error(e, 'Error updating character')

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // P2022: Unique constraint failed
      // Prisma error codes: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
      if (e.code === 'P2002') {
        logger.error('The character already exists', e)
        throw new RedwoodError('The character already exists')
      }
    }
    throw e
  }
}

export const deleteCharacter: MutationResolvers['deleteCharacter'] = ({
  id,
}) => {
  return db.character.delete({
    where: { id },
  })
}
