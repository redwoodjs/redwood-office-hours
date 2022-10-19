import type { Prisma, Profile } from '@prisma/client'
import { db } from 'api/src/lib/db'
import { copycat, fictional } from '@snaplet/copycat'

/**
 * Seed the database with some Users, Profiles, and Posts
 *
 * Uses Snaplet's copycat to seed deterministic fake data.
 *
 * Demonstrates Prisma's createMany and also nested writes using create with Prisma's
 * connect to seed relationship data
 */

// Seed data should be small and purposeful, so that it is quick to run on migrations
// and database resets.
//
// For larger datasets, use a separate script to seed the database suing a CSV file
// and Postgres's COPY command
const RECORDS_TO_SEED = 20

/**
 * Seeds users with Prisma's createMany
 *
 */
const seedUsers = async () => {
  const user = fictional.shape({
    email: copycat.email,
  })

  const data: Prisma.UserCreateArgs['data'][] = copycat.times(
    `user`,
    RECORDS_TO_SEED,
    user
  )

  await db.user.createMany({ data, skipDuplicates: true })

  return data
}

/**
 * Seeds profiles with Prisma's nested writes based on existing users
 *
 * Note that Prisma's nested writes are not yet supported by createMany
 * so we have to create each profile individually
 *
 */
const seedProfiles = async (users) => {
  const company = fictional.join(' ', [
    copycat.word,
    copycat.oneOf([
      'Inc.',
      'Incorporated',
      'Ltd.',
      'Corp.',
      'Corporation',
      'Systems',
    ]),
  ])

  const profile = fictional.shape({
    firstName: copycat.firstName,
    lastName: copycat.lastName,
    bio: copycat.paragraph.options({ min: 2, max: 3 }),
    dateOfBirth: copycat.dateString.options({ minYear: 1970, maxYear: 2000 }),
    phoneNumber: copycat.phoneNumber,
    company: company,
    postalAddress: copycat.postalAddress,
    membershipLevel: copycat.oneOf(['free', 'monthly', 'annual']),
    numberOfPostsRead: copycat.int.options({ min: 0, max: 20 }),
    timezone: copycat.timezone,
  })

  const data = copycat.times(`profile`, users.length, profile)

  const profiles = Promise.all(
    data.map(async (profile, i) => {
      return await db.profile.create({
        data: {
          ...profile,
          user: { connect: { email: users[i].email } },
        },
      })
    })
  )

  return profiles
}

/**
 * Seeds posts with Prisma's nested writes based on existing profiles
 *
 * Note that Prisma's nested writes are not yet supported by createMany
 * so we have to create each post individually
 *
 */
const seedPosts = async (profiles) => {
  const post = fictional.shape({
    title: copycat.sentence.options({ min: 3, max: 5 }),
    content: copycat.paragraph.options({ min: 2, max: 3 }),
    published: copycat.bool,
    tags: copycat.someOf([2, 3], [`tech`, `life`, `music`, `art`, `science`]),
  })

  const posts: Prisma.PostCreateArgs['data'][] = copycat.times(
    `post`,
    RECORDS_TO_SEED,
    post
  )

  Promise.all(
    posts.map(async (post, i) => {
      await db.post.create({
        data: {
          title: post.title,
          content: post.content,
          published: post.published,
          tags: post.tags,
          profile: { connect: { id: profiles[i].id } }, // This assumes there as many profiles as posts
        },
      })
    })
  )
}

export default async () => {
  try {
    const users = await seedUsers()
    const profiles = await seedProfiles(users)
    await seedPosts(profiles)
  } catch (error) {
    console.error(error)
  }
}
