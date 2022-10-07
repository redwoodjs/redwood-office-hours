import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import { copycat } from '@snaplet/copycat'

export default async () => {
  try {
    const data: Prisma.PersonCreateArgs['data'][] = [...Array(500).keys()].map(
      (key) => {
        return {
          fullName: copycat.fullName(key),
          postalAddress: copycat.postalAddress(key),
        }
      }
    )

    await db.person.createMany({ data, skipDuplicates: true })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
