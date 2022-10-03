import type { Prisma } from '@prisma/client'
import { Episode } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const data: Prisma.CharacterCreateArgs['data'][] = [
      {
        name: 'Luke Skywalker',
        appearsIn: [
          Episode.NEW_HOPE,
          Episode.EMPIRE_STRIKES_BACK,
          Episode.RETURN_OF_THE_JEDI,
        ],
      },
      {
        name: 'Han Solo',
        appearsIn: [
          Episode.NEW_HOPE,
          Episode.EMPIRE_STRIKES_BACK,
          Episode.RETURN_OF_THE_JEDI,
        ],
      },
      {
        name: 'Chewbacca',
        appearsIn: [
          Episode.NEW_HOPE,
          Episode.EMPIRE_STRIKES_BACK,
          Episode.RETURN_OF_THE_JEDI,
        ],
      },
      {
        name: 'Lando Calrissian',
        appearsIn: [Episode.EMPIRE_STRIKES_BACK, Episode.RETURN_OF_THE_JEDI],
      },
      { name: 'Jabba the Hut', appearsIn: [Episode.RETURN_OF_THE_JEDI] },
    ]

    await db.character.createMany({ data, skipDuplicates: true })
  } catch (error) {
    console.error(error, 'Unable to seed data. Use the force.')
  }
}
