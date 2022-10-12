import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import { copycat } from '@snaplet/copycat'
import { shape } from 'fictional'

export default async () => {
  try {
    const n = 100_000
    const batch = 10_000
    console.info(`Creating ${n} people to search through ...`)

    const person = shape({
      fullName: copycat.fullName,
      postalAddress: copycat.postalAddress,
    })

    for (var i = 1; i <= n / batch; i++) {
      const data: Prisma.PersonCreateArgs['data'][] = copycat.times(
        `person-${i}`,
        batch,
        person
      )

      console.info(
        `Creating ${data.length} x ${i} = ${data.length * i} records ...`
      )

      await db.person.createMany({ data, skipDuplicates: true })
    }

    console.info(`Done!`)
  } catch (error) {
    console.error(error)
  }
}
