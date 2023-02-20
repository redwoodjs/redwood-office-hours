import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { copycat, fictional } from '@snaplet/copycat'

export const profile = fictional.shape({
  name: copycat.fullName,
  email: copycat.email,
  birthday: copycat.dateString,
})

export default async () => {
  try {
    const data: Prisma.ProfileCreateArgs['data'][] = copycat.times(
      `profile`,
      20,
      profile
    )
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    Promise.all(
      data.map(async (data: Prisma.ProfileCreateArgs['data']) => {
        const record = await db.profile.create({ data })
        console.log(record)
      })
    )
  } catch (error) {
    console.error(error)
  }
}
