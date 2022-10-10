import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import { copycat } from '@snaplet/copycat'

export default async () => {
  console.info(`Creating 100,000 people to search through...`)

  try {
    for (var i = 1; i <= 10; i++) {
      const data: Prisma.PersonCreateArgs['data'][] = [
        ...Array(10_000).keys(),
      ].map((key) => {
        return {
          fullName: copycat.fullName(key),
          postalAddress: copycat.postalAddress(key),
        }
      })
      console.info(
        `Creating ${data.length} x ${i} = ${data.length * i} records...`
      )

      await db.person.createMany({ data, skipDuplicates: true })
    }

    console.info(`Done!`)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
