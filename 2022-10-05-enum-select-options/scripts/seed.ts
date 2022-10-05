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

    const shipData: Prisma.SpaceshipCreateArgs['data'][] = [
      {
        name: 'Death Star',
        appearsIn: [
          Episode.NEW_HOPE,
          Episode.EMPIRE_STRIKES_BACK,
          Episode.RETURN_OF_THE_JEDI,
        ],
      },
      {
        name: 'Millennium Falcon',
        appearsIn: [
          Episode.NEW_HOPE,
          Episode.EMPIRE_STRIKES_BACK,
          Episode.RETURN_OF_THE_JEDI,
        ],
      },
      {
        name: 'Naboo Royal Cruiser',
        appearsIn: [Episode.ATTACK_OF_THE_CLONES],
      },
      {
        name: 'Home One',
        appearsIn: [Episode.RETURN_OF_THE_JEDI],
      },
      {
        name: 'Super Star Destroyer',
        appearsIn: [Episode.EMPIRE_STRIKES_BACK],
      },
    ]

    await db.spaceship.createMany({ data: shipData, skipDuplicates: true })
  } catch (error) {
    console.error(error, 'Unable to seed data. Use the force.')
  }
}
