import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const autocomplete: QueryResolvers['autocomplete'] = ({ input }) => {
  return db.person.findMany({
    where: {
      OR: [
        { postalAddress: { contains: input.query, mode: 'insensitive' } },
        { fullName: { contains: input.query, mode: 'insensitive' } },
      ],
    },
    take: 10,
    orderBy: { postalAddress: 'asc' },
  })
}
